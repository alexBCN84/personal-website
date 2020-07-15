import { DataProvider, reducer } from './store';
import { render } from '@testing-library/react';
import React from 'react';
import { rowMockData, initialStateMock } from '../data/mockData';
import { SET_ACTIVE_LANGUAGE } from './actions';

function renderDataProvider(){
    return render(
        <DataProvider data={rowMockData}>
                <div>
                    <h1>Test header 1</h1>
                    <h2>Test header 2</h2>
                </div>
        </DataProvider>
    )
}

const useReducer = jest.spyOn(React, 'useReducer');
useReducer.mockImplementation(() => ([state, dispatch]));



describe('store', () => {
    it('renders DataProvider without crashing', () => {
        const { container } = renderDataProvider();
        expect.assertions(1);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('sets active language', () => {
        const action = {
            type: SET_ACTIVE_LANGUAGE,
            languages: { active: 'ES', inactive: 'EN' }
        }

        expect.assertions(1);
        expect(reducer(initialStateMock, action)).toEqual({languages: action.languages});
    });

    it('throws error if action type does not match any case', () => {
        const consoleError = console.error;
        // reset console Error to avoid error message being logged when running test
        console.error = jest.fn();

        const NO_CASE = "no case";
        const action = {
            type: NO_CASE,
            languages: { active: 'ES', inactive: 'EN' }
        }
        expect.assertions(1);
        expect(() => reducer(initialStateMock, action)).toThrow('Could not find a case match');
        // set console.error back to its original state
        console.error = consoleError;
    });
});