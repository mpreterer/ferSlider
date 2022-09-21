type valueOutput = number | { from: number, to: number };
type orientation = 'vertical' | 'horizontal';
type gap = 'from' | 'to';
type type = 'oneRange' | 'doubleRange';
type optionsParentDom = HTMLDivElement;
type updateOutputValue = { option: gap, value: number };

export {
  valueOutput, orientation, gap, type, optionsParentDom, updateOutputValue,
};