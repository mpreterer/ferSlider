type THandles = "valueFrom" | "valueTo";
type TUpdateThumb = {
  handle: THandles;
  value: number;
};
type TDOMParents = HTMLDivElement | HTMLSpanElement;
type UpdateValues = { handle: THandles, value: number };
type SliderEvents = 'updateSettings' | 'updateValues';

enum EventList {
  updateSettings = 'updateSettings',
  updateValues = 'updateValues',
  slide = 'slide',
}

export {
  THandles,
  TUpdateThumb,
  TDOMParents,
  UpdateValues,
  SliderEvents,
  EventList,
}
