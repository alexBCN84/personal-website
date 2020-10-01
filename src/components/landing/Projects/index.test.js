import React from 'react';
import { render } from '@testing-library/react';
import { Projects } from './index';

describe('Projects component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Projects />)
        expect(container.firstChild).toMatchSnapshot();
    });
});