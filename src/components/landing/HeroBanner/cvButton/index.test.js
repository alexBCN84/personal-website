import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from "@testing-library/react";
import CvButton from './index';

function renderButton () {
    return render(
        <CvButton href="https://alexgines.netlify.app/">
            <p>My button</p>
        </CvButton>
    )
}

function rerenderButton () {
    return render(
        <CvButton href="https://alexgines.netlify.app/">
            <p>My button</p>
        </CvButton>
    )
}

describe('cvButton', () => {
    it('renders without crashing', () => {
        const { container, rerender } = renderButton();
        expect.assertions(1);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('changes color when user hovers and unhovers over it', () => {
        const { getByRole, container, debug } = renderButton();
        const link = getByRole('link');
        const fillElements = container.querySelectorAll('[fill="#fff"]');
         userEvent.hover(link);
         rerenderButton();
         fillElements.forEach( element =>  expect(element.getAttribute('fill')).toStrictEqual('#000'));
         userEvent.unhover(link);
         rerenderButton();
         fillElements.forEach( element =>  expect(element.getAttribute('fill')).toStrictEqual('#fff'));
    });
});