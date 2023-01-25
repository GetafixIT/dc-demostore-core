import {JoinLineProps} from "@components/cms-modern/Shoppable/video/types";

export const JoinLine = ({
  coordsHotSpot,
  coordsCaption,
}: JoinLineProps) => {
  const vec = {
    x: coordsCaption.w - coordsHotSpot.w,
    y: coordsCaption.h - coordsHotSpot.h
  };

  const width = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  const rotate = Math.atan2(vec.y, vec.x);

  return (
    <div
      className="joinLine"
      style={{
        width: `${width}px`,
        transform: `translate(${coordsHotSpot.w}px, ${coordsHotSpot.h}px) rotate(${rotate}rad)`
      }}
    />
  );
};
