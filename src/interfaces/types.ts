export type THandles = "thumbLeft" | "thumbRight";
export type TUpdateThumb = {
  handle: THandles;
  value: number;
  valueFromStep?: boolean;
};
export type TDOMParents = HTMLDivElement | HTMLSpanElement;
export type UpdateValues = { handle: THandles, value: number };
