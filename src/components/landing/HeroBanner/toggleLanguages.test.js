import { toggleLanguage } from './toggleLanguage';

const styles = { 
    fixedPosition: 'fixed',
    relativePosition: 'relative'
}

const element = document.createElement('div');

it('returns a function', () => {
    expect.assertions(1)
    expect(typeof toggleLanguage(styles)).toBe('function')
});

it('returns relative position if the element is not intersecting and it is not visible', () => {
    const IntersectionObserverEntryMock = {
        isIntersecting: false,
        isVisible: false
    }

    const entries = [IntersectionObserverEntryMock];
    const returnedFunction = toggleLanguage(styles, element);
    expect.assertions(1);
    expect(returnedFunction(entries)).toStrictEqual('relative');
});

it('returns fixed position if the element is intersecting but it is not visible', () => {
    const IntersectionObserverEntryMock = {
        isIntersecting: true,
        isVisible: false
    }

    const entries = [IntersectionObserverEntryMock];
    const returnedFunction = toggleLanguage(styles, element);
    expect.assertions(1);
    expect(returnedFunction(entries)).toStrictEqual('fixed');
});