import { ShoppableImagePoint } from "./shoppableTypes";

export const getTransformOffset = (
  hotspot: undefined | ShoppableImagePoint,
  canvasWidth: number,
  canvasHeight: number
): any => {
  if (!hotspot) {
    return false;
  }
  const w = hotspot?.x * canvasWidth;
  const h = hotspot?.y * canvasHeight;
  return { w, h };
};

export const scaleHotspot = (
  hotspot: undefined | ShoppableImagePoint,
  canvasWidth: number,
  canvasHeight: number
): any => {
  if (!hotspot) {
    return false;
  }
  const { w, h } = getTransformOffset(hotspot, canvasWidth, canvasHeight);
  return {
    transform: `translate(${w}px, ${h}px)`
  };
};
