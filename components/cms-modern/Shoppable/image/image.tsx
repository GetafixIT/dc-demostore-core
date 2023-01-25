import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { Annotations } from "./annotations";
import { ShoppableImageWrapper } from "./styles";
import { ShoppableVideoProps } from "../video/types";

export const Image: FC<ShoppableVideoProps> = (props) => {
  const { shoppableImage, hotspotHide = false, polygonHide = true } = props;
  const { hotspots = [], polygons = [], image: imageData } = shoppableImage;
  const [loaded, setLoaded] = useState(false);
  const [imgProps, setImgProps] = useState({
    w: 0,
    h: 0
  });
  const refImg = useRef<HTMLImageElement>(null);

  const storeImageProps = () => {
    if (refImg?.current) {
      // @ts-ignore
      setImgProps({w: refImg?.current?.width | 0, h: refImg?.current?.height} | 0);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", storeImageProps);
    return () => window.removeEventListener("resize", storeImageProps);
  }, [imgProps]);

  useEffect(() => {
    if (refImg.current) {
      setLoaded(true);
      storeImageProps();
    }
  }, [refImg]);

  let image: ReactNode | undefined;
  let src = "invalid";

  if (imageData?.id) {
    const imageHost = imageData?.defaultHost;
    src = `https://${imageHost}/i/${imageData?.endpoint}/${encodeURIComponent(
      imageData?.name
    )}`;

    image = (
      <img
        ref={refImg}
        src={src}
        alt=""
        crossOrigin="anonymous"
        style={{ width: "100%", height: "auto" }}
        onLoad={() => {
          setLoaded(true);
          storeImageProps();
        }}
      />
    );
  }

  return (
    <ShoppableImageWrapper>
      {image}

      {loaded && refImg.current && (
        <Annotations
          imgProps={imgProps}
          polygons={polygons}
          hotspots={hotspots}
          polygonHide={polygonHide}
          hotspotHide={hotspotHide}
        />
      )}
    </ShoppableImageWrapper>
  );
};

export default Image;
