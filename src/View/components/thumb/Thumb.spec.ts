/**
 * @jest-environment jsdom
 */
import IValidSettings from '../../../interfaces/IValidSettings';
import defaultSettings from '../../../Model/defaultSettings';
import styleClasses from '../../styleClasses';
import Thumb from './Thumb';

describe('Thumb:', () => {
    const thumb = new Thumb(defaultSettings);

    beforeEach(() => {
        thumb.updateState(defaultSettings);
    });

    describe('updateState:', () => {
        test('должен обновлять состояние tip', () => {
            const newOptions: IValidSettings = {
                ...defaultSettings,
                ...{ isVertical: true },
            };

            thumb.updateState(newOptions);

            expect(thumb.getDom().classList.contains(`${styleClasses.THUMB_VERTICAL}`)).toBeTruthy();
        });
    });

    describe('getDom:', () => {
        test('должен вернуть DOM tip', () => {
            expect(thumb.getDom()).toEqual(expect.any(HTMLDivElement));
        });
    });

    describe('setValue:', () => {
        test('должен задавать значение подсказки', () => {
            thumb.setValue(812);

            expect(thumb.getDom().textContent).toEqual('812');
        });
    });
});