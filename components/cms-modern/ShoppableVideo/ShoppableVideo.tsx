// @ts-nocheck
import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import {CmsContent} from '@lib/cms/CmsContent';
import {pointsToSVGPath, SVGPath} from './polygon'
import {ShoppableImageHotspot, ShoppableImagePolygon,} from "./ShoppableVideoData";
import {useWindowContext} from '../../core/WithWindowContext/WindowContext';
import clsx from 'clsx';
import {Tooltip} from '@mui/material';
import Link from 'next/link';
import {nanoid} from 'nanoid'
import {AnimationCanvas} from './style';
import {Controls, PlayState, Timeline, Tween} from "react-gsap";
import {gsap} from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

type Props = {
  shoppableVideo: any;
  scaleToFit: boolean;
  hotspotHide: boolean;
  polygonHide: boolean;
  focalPointHide: boolean;
} & CmsContent;

type MarkerProps = {
  titleStr: string;
  linkHref: string;
  points: [],
  i: number,
  tl: any,
  ref: HTMLDivElement,
  gsap: any
}


const Marker: ForwardedRef<any> = forwardRef(({titleStr, linkHref, points, i, tl, gsap}, ref) => {
  const el = useRef();
  const startX = points[0]?.p?.x;
  const startY = points[0]?.p?.y;

  useImperativeHandle(ref, () => {

    // return our API
    return {
      startFrom(props){
        let method = 'from'
        // if(props.delay > 0){
        //   method = 'to'
        //   tl.current.from(el.current, { duration: props.delay - 0.4, opacity: 0 });
        // }
        tl.current.from(el.current, props);
      },
      moveTo(props) {
        tl.current.to(el.current, props);
      },
      endOn(props){
        tl.current.to(el.current, props);
      },
      setTotalDuration(totalDuration){
        tl.current.totalDuration(7.56);
      },
      points
    };
  }, []);

  return <Link
    href={linkHref}
  >
    <Tooltip
      title={titleStr}
    >

      <div
        className={`marker hotspot${i}`}
        ref={el}
        style={{
          left: `${startX * 100}%`,
          top: `${startY * 100}%`,
        }}
      >
        <svg
          viewBox="0 0 20 20"
          className={clsx("amp-vis-page__hotspotplus")}
        >
          <rect x="9.15" y="3.5" width="1.7" height="13"></rect>
          <rect y="9.15" x="3.5" width="13" height="1.7"></rect>
        </svg>
    </div>

    </Tooltip>
  </Link>
});

const ShoppableVideo: FC<Props> = (props) => {

  const {
    shoppableVideo,
  } = props;


  const refContainer = useRef<HTMLDivElement>(null);
  const canvasRef = React.createRef<HTMLDivElement>();
  const refVideo = useRef<HTMLVideoElement>(null);
  const [imageSize, setImageSize] = useState({w: -1, h: -1});
  const [headPosition, setHeadPosition] = useState(0);
  const [videoRunning, setVideoRunning] = useState(PlayState.stop);
  // @ts-ignore
  const headPercentage = (headPosition / refVideo?.current?.duration) * 100;
  const duration = refVideo?.current?.duration || 0
  let videoElement;
  let canvas;
  const tl = useRef(gsap.timeline({paused: true}));
  // tl.current.totalDuration(54)

  let marker = null;
  const markerRefs = useRef([]);
  markerRefs.current = [];

  const addMarkerRef = ref => {

    if (ref) {
      markerRefs.current.push(ref);
    }
  };

  useLayoutEffect(() => {

    videoElement = refVideo.current;
    videoElement.volume = 0.05;
    const listener = (event) => {
      setHeadPosition(videoElement.currentTime)
    }

    const metaListener = function (e) {
      const width = this.videoWidth;
      const height = this.videoHeight;
      setImageSize({w: width, h: height})
    };

    const playListener = (event) => {
      console.log('play', event);
      // setVideoRunning(PlayState.play)
      tl.current.play();
    }

    const pauseListener = (event) => {
      console.log('pause');
      // setVideoRunning(PlayState.pause)
      tl.current.pause();
    }

    // // @ts-ignore
    // videoElement.addEventListener("loadedmetadata", metaListener, false);
    // // @ts-ignore
    // videoElement.addEventListener("timeupdate", listener);
    // @ts-ignore
    videoElement.addEventListener('play', playListener);
    // @ts-ignore
    videoElement.addEventListener('pause', pauseListener);


    markerRefs.current.forEach((ref, i) => {
      const isLastMarker = i === markerRefs.current.length - 1;

        ref.points.forEach((point, pi) => {
          const start = pi === 0;
          const newSequence = pi > 0 && ref.points[pi - 1].e === true;

          if(start || newSequence){
            const from = {
              delay: point.t,
              left: `${point.p.x * 100}%`,
              top: `${point.p.y * 100}%`,
            }
            ref.startFrom(from)
          }
          else{
            const prev = ref.points[pi-1]
            ref.moveTo({
              duration: point.t - prev.t,
              left: `${point.p.x * 100}%`,
              top: `${point.p.y * 100}%`
            })
          }

          if(point.e === true){
            ref.endOn({duration: 0.4, opacity: 0})
          }

        })

      if(isLastMarker){
        ref.setTotalDuration(54.8)
      }
    })

    return () => {
      // // @ts-ignore
      // videoElement.removeEventListener("loadedmetadata", metaListener);
      // // @ts-ignore
      // videoElement.removeEventListener("timeupdate", listener);
      // @ts-ignore
      videoElement.removeEventListener("play", playListener);
      // @ts-ignore
      videoElement.removeEventListener("pause", pauseListener);
    };
  }, []);


  const hotspotTitle = (hotspot: ShoppableImageHotspot | ShoppableImagePolygon) => {
    return `Target: ${hotspot.target} | Selector: ${hotspot.selector}`;
  };

  const hotspotLink = (hotspot: ShoppableImageHotspot | ShoppableImagePolygon) => {
    let url = '#';
    //console.log('hotspot: ', hotspot);
    switch (hotspot.selector) {
      case '.page':
        url = `/${hotspot.target}`;
        break;
      case '.link':
        url = hotspot.target;
        break;
      case '.product':
        url = `/product/${hotspot.target}`;
        break;
      case '.category':
        url = `/category/${hotspot.target}`;
        break;
      default:
        break;
    }
    return url;
  };


  if (shoppableVideo) {

    canvas = (
      <AnimationCanvas
        className="amp-vis-page__interactive"
        ref={canvasRef}
      >

        {shoppableVideo &&
        shoppableVideo.hotspots &&
        shoppableVideo.hotspots.map((hotspot: any, index: number) => (


          <div key={nanoid()}>
            <Link
              href={hotspotLink(
                (shoppableVideo.hotspots as ShoppableImagePolygon[])[index]
              )}
            >

              <span className="caption" style={{
                left: `${hotspot.timeline.points[0]?.cta?.x * 100}%`,
                top: `${hotspot.timeline.points[0]?.cta?.y * 100}%`,
              }}>
                {hotspot?.cta?.caption || ''}
              </span>

              {/*<Tooltip*/}
              {/*    title={hotspotTitle(*/}
              {/*        (shoppableVideo.hotspots as ShoppableImagePolygon[])[index]*/}
              {/*    )}*/}
              {/*    followCursor*/}
              {/*>*/}
              {/*    <PolygonForwardRef*/}
              {/*        size={size}*/}
              {/*        className={clsx("amp-vis-page__polygon", {*/}
              {/*            "amp-vis-page__polygon--hidden": hiddenPolygons,*/}
              {/*        })}*/}
              {/*        polygon={hotspot.points}*/}
              {/*    />*/}
              {/*</Tooltip>*/}
            </Link>

            <Marker
              titleStr={hotspotTitle(hotspot)}
              linkHref={hotspotLink(hotspot)}
              i={index}
              points={hotspot.timeline.points}
              ref={addMarkerRef}
              tl={tl}
              gsap={gsap}
            />
          </div>

        ))}

      </AnimationCanvas>
    );
  }

  const videoSrc = `https://${shoppableVideo.video.defaultHost}/v/${shoppableVideo.video.endpoint}/${encodeURIComponent(
    shoppableVideo.video.name
  )}/mp4_720p`;

  return (
    <div ref={refContainer} className="amp-vis-page" style={{height: "fit-content", margin: "30px 0"}}>
      <video controls style={{width: `100%`, zIndex: "1"}} ref={refVideo}>
        <source src={videoSrc} type="video/mp4"/>
      </video>
      {canvas}
    </div>
  );
}

export default ShoppableVideo;
