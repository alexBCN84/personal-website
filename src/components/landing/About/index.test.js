import React from 'react';
import { render } from '@testing-library/react';
import { About } from './index';

describe('About component', () => {
    it('renders without crashinf', () => {
        const { container } = render(<About />)
        expect(container.firstChild).toMatchSnapshot();
    });
});