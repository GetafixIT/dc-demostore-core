import React, { useEffect, useState } from "react";

import Link from "next/link";

import { hotspotLink } from "../hotspotLink";
import { AnnotationsProps } from "./types";
import {
  pointsToSVGPath,
  PolygonForwardRef,
  SVGPath
} from "../polygon";
import { scaleHotspot } from "../scaleHotspot";
import { ShoppableImagePolygon } from "../shoppableTypes";

export const Annotations = ({
  imgProps,
  polygons,
  hotspots,
  polygonHide,
  hotspotHide
}: AnnotationsProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!shouldRender) {
      setTimeout(() => {
        setShouldRender(true);
      }, 100);
    }
  });

  let polygonsProcessed: SVGPath[] = polygons.map((polygon: any) =>
    pointsToSVGPath(polygon.points)
  );

  const size = { x: imgProps.w, y: imgProps.h };

  // @ts-ignore
  return !shouldRender ? null : (
    <div
      className="interactive"
      style={{
        width: imgProps.w + "px",
        height: imgProps.h + "px",
        transform: ""
      }}
    >
      {polygonsProcessed.map((polygon: any, index: number) => (
        <Link
          key={index}
          href={hotspotLink((polygons as ShoppableImagePolygon[])[index])}
          legacyBehavior={true}
        >
          <>
            <PolygonForwardRef
              size={size}
              className={`polygon ${polygonHide ? "hidden" : ""}`}
              polygon={polygon}
            />
          </>
        </Link>
      ))}

      {hotspots.map((hotspot: any, index: number) => (
        <Link
          key={index}
          href={hotspotLink(hotspot)}
          title={hotspotLink(hotspot)}
          className={`hotspot ${hotspotHide ? "hidden" : ""}`}
          style={scaleHotspot(hotspot.points, imgProps.w, imgProps.h)}
          prefetch={false}
        >
          <svg viewBox="0 0 20 20" className="hotspotplus">
            <rect x="9.15" y="3.5" width="1.7" height="13"></rect>
            <rect y="9.15" x="3.5" width="13" height="1.7"></rect>
          </svg>
        </Link>
      ))}
    </div>
  );
};
