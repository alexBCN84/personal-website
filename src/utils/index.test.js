import {scrollTo} from './index';

let scrollIntoViewMock = jest.fn();

document.body.innerHTML = `
    <div id="about">About</div>
  `;

describe('Scroll to', () => {
  it('gets called on Click', () => {
    const element = document.getElementById('about');
    element.scrollIntoView = scrollIntoViewMock;
    scrollTo('about')
    expect(scrollIntoViewMock).toBeCalled();
  })
});