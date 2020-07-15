import { useStore, useData } from './storeHelpers';
import { render } from '@testing-library/react';
import React from 'react';
import { rowMockData } from '../data/mockData';
import * as Gatsby from 'gatsby';

const UseStoreWrapper = () => {
    useStore();
    return <div>Test</div>;

}

function renderUseStore() {
    return render(<UseStoreWrapper />)
}

describe('store helpers', () => {
    const consoleError = console.error;
    beforeEach(() => {
        // reset console Error to avoid error message being logged when running test
        console.error = jest.fn();
    })
    afterEach(() => {
         // set console.error back to its original state
         console.error = consoleError;
    })
    it('throw error if store is nullable or falsy in useStore', () => {
        expect.assertions(1);
        expect(() => renderUseStore()).toThrow('cannot use `useStore` outside of a storeProvider');
    });

    it('throw new error if data is nullable or falsy', () => {
        expect.assertions(1);
        expect(() => useData()).toThrow('cannot use `useData` without data passed to a storeProvider');
    });
    it('return data from useData when this one is provider', () => {
        expect.assertions(1);
        const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
        
        useStaticQuery.mockImplementation(() => ({
            ...rowMockData
        }));

        const data = {...rowMockData}
        expect(useData()).toEqual({data});
    })
});