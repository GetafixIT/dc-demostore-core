/* eslint-disable jsx-a11y/media-has-caption */
import React, { FC, useEffect, useRef, useState } from "react";

import { Annotations } from "./annotations";
import { ShoppableVideoProps } from "./types";
import { animInterval } from "@Tools/animInterval";

import { ShoppableVideoWrapper } from "./style";

export const Video: FC<ShoppableVideoProps> = (props) => {
  const { shoppableVideo } = props;

  const refContainer = useRef<HTMLDivElement>(null);
  const refVideo = useRef<HTMLVideoElement>(null);
  const [headPosition, setHeadPosition] = useState(0);
  const [videoProps, setVideoProps] = useState({ width: 0, height: 0 });
  const [animHandle, setAnimHandle] = useState<null | { clear: () => void }>(
    null
  );

  /*
    margin-top: -1px;
    height: 2px;
    position: absolute;
    transform-origin: left;
    background: linear-gradient(to right,transparent 50%,#ccc 50%);
    background-size: 8px 2px;

      width: 140.146px;
    transform: translate(322.771px, 165.073px) rotate(-2.47049rad);

   */

  const storeVideoProps = () => {
    if (refVideo.current) {
      setVideoProps({
        width: refVideo?.current?.clientWidth || 0,
        height: refVideo.current.clientHeight
      });
    }
  };

  const getHeadPosition = () => {
    if (refVideo.current) {
      setHeadPosition(refVideo.current.currentTime);
    }
  };

  useEffect(() => {
    storeVideoProps();
    window.addEventListener("resize", storeVideoProps);
    return () => window.removeEventListener("resize", storeVideoProps);
  }, [refVideo.current]);

  useEffect(() => {
    const videoElement = refVideo.current;

    if (videoElement) {
      setVideoProps({
        width: videoElement.clientWidth,
        height: videoElement.clientHeight
      });

      const timelineUpdate = () => {
        setVideoProps({
          width: videoElement.clientWidth,
          height: videoElement.clientHeight
        });
        setHeadPosition(videoElement.currentTime);
      };

      const playListener = () => {
        setAnimHandle(animInterval(getHeadPosition, 35));
      };

      const pauseListener = () => {
        if (animHandle) {
          animHandle.clear();
        }
      };

      videoElement.addEventListener("timeupdate", timelineUpdate);
      videoElement.addEventListener("loadedmetadata", timelineUpdate);
      videoElement.addEventListener("play", playListener);
      videoElement.addEventListener("pause", pauseListener);

      return () => {
        videoElement.removeEventListener("loadedmetadata", timelineUpdate);
        videoElement.removeEventListener("timeupdate", timelineUpdate);
        videoElement.removeEventListener("play", playListener);
        videoElement.removeEventListener("pause", pauseListener);
      };
    }
  }, [refVideo.current, headPosition]);

  const videoSrc = `https://${shoppableVideo.video.defaultHost}/v/${
    shoppableVideo.video.endpoint
  }/${encodeURIComponent(shoppableVideo.video.name)}/mp4_720p`;

  return (
    <ShoppableVideoWrapper ref={refContainer}>
      <video controls style={{ width: `100%`, zIndex: "1" }} ref={refVideo}>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <Annotations
        hotspots={shoppableVideo.hotspots}
        time={headPosition}
        width={videoProps.width}
        height={videoProps.height}
      />
    </ShoppableVideoWrapper>
  );
};

export default Video
