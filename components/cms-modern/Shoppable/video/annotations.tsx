import React, { useState, useEffect } from "react";

import { nanoid } from "nanoid";
import Link from "next/link";

import { hotspotLink } from "../hotspotLink";
import {
  getTransformOffset,
  scaleHotspot
} from "../scaleHotspot";
import { getHotspotPoint } from "./getHotspotPoint";
import { JoinLine } from "./joinLine";
import { AnimationCanvas } from "./style";

export interface AnnotationsProps {
  hotspots: {target: string}[];
  width: number;
  height: number;
  time: number;
}

export const Annotations = ({
  hotspots = [],
  width,
  height,
  time
}: AnnotationsProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!shouldRender) {
      setShouldRender(true);
    }
  });

  return !shouldRender ? null : (
    <AnimationCanvas className="interactive">
      {hotspots.map((hotspot: any, index: number) => {
        const coords = getHotspotPoint(time, hotspot.timeline);
        const style = scaleHotspot(coords, width, height);
        const cta = hotspot.timeline.points[0]?.cta;
        return !style ? null : (
          <div key={nanoid()}>
            <Link
              key={index}
              href={hotspotLink(hotspot)}
              prefetch={false}
            >
              <a
                title={hotspotLink(hotspot)}
                className={`hotspot`}
                style={style}
              >
              <svg viewBox="0 0 20 20" className="hotspotplus">
                <rect x="9.15" y="3.5" width="1.7" height="13"></rect>
                <rect y="9.15" x="3.5" width="13" height="1.7"></rect>
              </svg>
              </a>
            </Link>

            <Link
              href={hotspotLink(hotspots[index])}
            >
              <a
                className="caption"
                style={scaleHotspot(cta, width, height)}
              >
                <span>{hotspot?.cta?.caption || ""}</span>
              </a>
            </Link>

            <JoinLine
              coordsHotSpot={getTransformOffset(coords, width, height)}
              coordsCaption={getTransformOffset(cta, width, height)}
            />
          </div>
        );
      })}
    </AnimationCanvas>
  );
};
