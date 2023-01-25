import { ShoppableVideoHotspot } from "../shoppableTypes";

import { interpolatedPoint } from "./interpolatedPoint";

export const getHotspotPoint = (
  time: number,
  hotspot: ShoppableVideoHotspot
) => {
  const timeline = hotspot.points || [];
  const noKeyframes = timeline.length === 0;
  const outsideTimeRange = timeline?.[0]?.t > time;
  if (noKeyframes || outsideTimeRange) {
    return undefined;
  }

  let previous = timeline[0];
  let i;
  for (i = 1; i < timeline.length; i++) {
    const point = timeline[i];
    const isFutureKeyframe = point.t >= time;
    if (isFutureKeyframe) {
      const isEndPoint = previous.e;
      return isEndPoint ? undefined : interpolatedPoint(previous, point, time);
    }
    previous = point;
  }
  const finalPointOutsideRange = previous.e && time > previous?.t;
  return finalPointOutsideRange ? undefined : previous?.p;
};
