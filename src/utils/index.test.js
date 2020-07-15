import {scrollTo, SVS_B} from './index';

describe('scrollTo function', () => {
    afterEach(jest.clearAllMocks);
    jest.useFakeTimers();
    const scrollBySpy = jest.fn();
    global.scrollBy = scrollBySpy;
    const getBoundingClientRectSpy = jest.fn(() => ({ 
        bottom: 2800,
        height: 1400,
        left: 0,
        right: 982,
        top: 1400,
        width: 982,
        x: 0,
        y: 1400 
    }));

    const element = document.createElement('div');
    element.getBoundingClientRect = getBoundingClientRectSpy;
    
    it('scrollTo calls window.setTimeOut', () => {
        scrollTo(element, 275, 'top')
        expect.assertions(10);
        expect(setTimeout.mock.calls.length).toBe(101);
        // The first argument of the first call to the function was SVS_B
        expect(setTimeout.mock.calls[0][0]).toBe(SVS_B);
        // The second argument of the first call to the function was 0
        expect(setTimeout.mock.calls[0][1]).toBe(0);
        // The second argument of the second call to the function was 2.75
        expect(setTimeout.mock.calls[1][1]).toBe(2.75);
        // The second argument of the third call to the function was 5.5
        expect(setTimeout.mock.calls[2][1]).toBe(5.5);
        // The second argument of the fourth call to the function was 8.25
        expect(setTimeout.mock.calls[3][1]).toBe(8.25);
        // The second argument of the 100th call to the function was 272.25
        expect(setTimeout.mock.calls[99][1]).toBe(272.25);
        // The second argument of the 101th call to the function was 275
        expect(setTimeout.mock.calls[100][1]).toBe(275);
        // The third argument of the first call to the function was 14
        expect(setTimeout.mock.calls[0][2]).toBe(14);
        // The fourth argument of the first call to the function was 'top'
        expect(setTimeout.mock.calls[0][3]).toBe('top');
    });
    it('SVS_B calls scrollBy with position `top`', () => {
        expect.assertions(2);
        SVS_B(200, 'top');
        expect(scrollBySpy).toHaveBeenCalledTimes(1);
        expect(scrollBySpy).toHaveBeenCalledWith(0, 200);
    });
    it('SVS_B calls scrollBy with position `center`', () => {
        expect.assertions(2);
        SVS_B(200, 'center');
        expect(scrollBySpy).toHaveBeenCalledTimes(1);
        expect(scrollBySpy).toHaveBeenCalledWith(0, 100);
    });
})