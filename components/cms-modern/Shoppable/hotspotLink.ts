import {
  ShoppableImageHotspot,
  ShoppableImagePolygon
} from "./shoppableTypes";

export const hotspotLink = (
  hotspot: { target: string }
) => {
  const isExt = hotspot.target.indexOf("http") > -1;
  return `${isExt ? hotspot.target : `/${hotspot.target}`}`;
};
