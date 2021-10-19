type ValueOutput = number | { from: number, to: number };
type Orientation = 'vertical' | 'horizontal';
type Gap = 'from' | 'to';
type Type = 'from-start' | 'from-end' | 'range';
type parentDom = HTMLDivElement;
type UpdateOutputValue = { option: Gap, value: number };

export {
    ValueOutput, Orientation, Gap, Type, parentDom, UpdateOutputValue,
};