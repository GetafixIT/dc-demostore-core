export type ShoppableImageProps = {
  shoppableImage: any;
  scaleToFit: boolean;
  hotspotHide: boolean;
  polygonHide: boolean;
  focalPointHide: boolean;
  [key: string]: any;
};

export type ShoppableVideoProps = {
  shoppableVideo: any;
  scaleToFit: boolean;
  hotspotHide: boolean;
  polygonHide: boolean;
  focalPointHide: boolean;
  [key: string]: any;
};


export interface JoinLineProps {
  coordsHotSpot: ShoppableCoord;
  coordsCaption: ShoppableCoord;
}

export type ShoppableCoord = {
  w: number;
  h: number;
}
