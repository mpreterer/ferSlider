/**
 * @jest-environment jsdom
 */
import IValidSettings from '../../../interfaces/IValidSettings';
import defaultSettings from '../../../Model/defaultSettings';
import styleClasses from '../../styleClasses';
import Bar from './Bar';

describe('Bar:', () => {
    const bar = new Bar(defaultSettings);

    beforeEach(() => {
        bar.updateState(defaultSettings);
    });

    describe('updateState:', () => {
        test('должен обновлять состояние бара', () => {
            const newOptions: IValidSettings = {
                ...defaultSettings,
                ...{ isVertical: true},
            };

            bar.updateState(newOptions);

            expect(bar.getDom().classList.contains(`${styleClasses.BAR_VERTICAL}`)).toBeTruthy();
        });
    });

    describe('getDom:', () => {
        test('должен вернуть DOM бара', () => {
            expect(bar.getDom()).toEqual(expect.any(HTMLDivElement));
        });
    });

    describe('getLength:', () => {
        test('должен вернуть длину бара', () => {
            const width = 175;

            bar.getDom().setAttribute('style', `width: ${width}px; height: 50px;`);

            expect(bar.getLength()).toEqual(width);
        });
    });

    describe('getOffset:', () => {
        test('должен вернуть отступ бара', () => {
            expect(bar.getOffset()).toEqual(expect.any(Number));
        });
    });
});