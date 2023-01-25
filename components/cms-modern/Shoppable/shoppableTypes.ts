export interface ShoppableImagePoi {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ShoppableImagePoint {
  x: number;
  y: number;
  t?: number;
}

export interface ShoppableVideoPoint {
  p: {
    x: number;
    y: number;
  };
  cta: {
    x: number;
    y: number;
  };
  t: number;
  e?: boolean;
}

export interface ShoppableImageHotspot {
  id: string;
  selector: string;
  points: ShoppableImagePoint;
  target: string;
}

export interface ShoppableVideoHotspot {
  id: string;
  selector: string;
  points: ShoppableVideoPoint[];
  target: string;
}

export interface ShoppableImagePolygon {
  id: string;
  selector: string;
  points: ShoppableImagePoint[];
  target: string;
}

export interface ShoppableTypes {
  poi?: ShoppableImagePoi;
  hotspots?: ShoppableImageHotspot[];
  polygons?: ShoppableImagePolygon[];
}
