export type THandles = 'thumbLeft' | 'thumbRight';
export type TValueFrom = number | { minValue: number, maxValue: number };
export type TUpdateThumb = { handle: THandles, value: number, valueFromStep?: boolean };
export type TDOMParents = HTMLDivElement | HTMLSpanElement;