import { setupIntersectionObserverMock } from "../../../../__mocks__/intersection-observer"; 
import { HeroBanner } from '../index';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from '../../../data-management/store';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import { scrollTo } from '../../../utils/index';
import { toggleLanguage } from './toggleLanguage';

// mock the implementation of the scrollTo function
jest.mock('../../../utils/index');
jest.mock('./toggleLanguage');

expect.extend({ toMatchDiffSnapshot });

const defaultMockData = {
  heroBannerData: {
    logo: {
      base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAC4jAAAuIwF4pT92AAACU0lEQVQ4y22Vz0tVURDH73u+vBFYIYhERItq3x8QEQgWZYsMikDoJ5VRq2zRxnDjRpAgqk3Zs0KJeBUtoq3VIgoKKgrLhH4aRLnQRT/o3T5D35Hxdg98mTnnzHzPnJk59yZZliU2TIJyooG+uV6vV5ET4JfwFgyDjuBXjhyRrGQ6JG3oL7N/4zcYY+0q8gq4J2Ib46y3B///yZAnZfwZ7MGhKckN1heBLvBBtn3zSHEqRzLmo4g0R3IAdIOdYKHWFoCqfPp0u7I7tOm0kUCSymit9h7psOW5wy5of2tcfIXxJydBNoTIR+RwRgVpdRvJkor1DlRsYYscdsugEnK6Rlc6jdgFbqG3eM7QK9K3i2OHLQ6rck3hRD/9rAxXgb3gJmgJ7eK3SMF3cMMmE5COFVS8VWRDmh/DruaEBdW/AyZN+Wm5Caf6NXpFeFQRHrEIQLMqvEJYKfvBTBFFQr/qYiXZx0ewX1c2wrta/2opVludcsLX4L4XRPKQHE6AjWAdOBwi7AT94JvsrLWuWbOb80XwBywJRXljzy+XI7tyzftQVbfRo/k0uJ0oAhsHtdEZ24hC+MvoRr8ufbVsHmjeoXmXn/5M+bBkPwYzoNEjDhE+gdTyOKXcL9PeOPgy92RR1uuEGg5DVoDQ5N7Em5CXdLUpf2rIc3NNnatsjzYux++iPUGbI0vKbxryel4+g952+W/hcRlY9fYxX1rQwKme2qSe5UDYK/wmbgDPRfwDPFTUVX1gZ7X3HmwLZKV5rCJtCFdtB5azpyqYRf0CjKoTKkW/gL+tuhI3CufaNQAAAABJRU5ErkJggg==',
      height: 40,
      src: '/static/b0ddc18a1e874e013ee42035351d5925/ff4be/logo.png',
      width: 40,
      srcSet: '/static/b0ddc18a1e874e013ee42035351d5925/ff4be/logo.png 1x,/static/b0ddc18a1e874e013ee42035351d5925/183c2/logo.png 1.5x,/static/b0ddc18a1e874e013ee42035351d5925/829e2/logo.png 2x'
    },
    about: 'about us',
    cvCTA: {
      text: 'See my CV',
      href: 'https://alexgines.netlify.app/'
    },
    description: 'I\'ve spent most of my life between Spain, France, the United Kingdom and the United States. I\'m currently based in Berlin, where I work as a Frontend Engineer at Zalando SE',
    headline: 'I am a former translator, a teacher at heart, and a Web Developer since 2016',
    kicker: 'Welcome to my Site'
  },
  state: {
    languages: {
      active: 'EN', 
      inactive: 'ES'
    },
  },
  dispatch: jest.fn()
}

global.ownerDocument = {};
global.ownerDocument.defaultView = global;



const renderHeroBanner = (data = defaultMockData) => (
  render(
    <Provider value={data}>
      <HeroBanner/>
    </Provider>
  )
)


const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });

describe('HeroBanner', () => {
  beforeEach(setupIntersectionObserverMock);
  afterEach(cleanup); 

  it('renders without crashing', () => {
    const { container } = renderHeroBanner();
    expect.assertions(1);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('renders UI for the different breakdowns', () => {
    it('renders desktop UI properly', () => {
      window.innerWidth = 1600;
      renderHeroBanner();
      expect.assertions(1);
      expect(screen.getByTestId('desktop')).toBeInTheDocument();
    });
  
    it('renders tablet UI properly', () => {
      window.innerWidth = 800;
      renderHeroBanner();
      expect.assertions(1);
      expect(screen.getByTestId('tablet')).toBeInTheDocument();
    });
  
    it('renders mobile UI properly', () => {
      window.innerWidth = 600;
      renderHeroBanner();
      expect.assertions(1);
      expect(screen.getByTestId('mobile')).toBeInTheDocument();
    });
  });

  it('calls dispacth function with the correct arguments when clicking language switch', () => {
    renderHeroBanner();
    const { inactive } = defaultMockData.state.languages;
    const languageSwitchBtn = screen.getByText(inactive);
    expect.assertions(3);
    expect(languageSwitchBtn).toBeInTheDocument();
    userEvent.click(languageSwitchBtn);
    const dispacthArgument = {
      type: 'set language',
      languages: {
        active: 'ES', 
        inactive: 'EN'
      }
    }
    expect(defaultMockData.dispatch.mock.calls.length).toBe(1);
    expect(defaultMockData.dispatch.mock.calls[0][0]).toStrictEqual(dispacthArgument);
  });

  it('updates the DOM when clicking language switxh button', () => { 
    const { asFragment } =  renderHeroBanner();
    const { inactive } = defaultMockData.state.languages;
    const languageSwitchBtn = screen.getByText(inactive);
    expect.assertions(1);
    userEvent.click(languageSwitchBtn);
    const firstRender = asFragment();
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  });

  it('renders text in English when inactive language `ES`', () => {
    renderHeroBanner();
    const { inactive } = defaultMockData.state.languages;
    const languageSwitchBtn = screen.getByText(inactive);
    const { about, cvCTA, description, headline, kicker } = defaultMockData.heroBannerData; 
    expect.assertions(6);
    expect(languageSwitchBtn).toHaveTextContent('ES');
    expect(screen.getByRole('heading', {name: kicker})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: headline})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: description})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: cvCTA.text})).toBeInTheDocument();
    expect(screen.getByText(about)).toBeInTheDocument();
  });

  it('renders text in Spanish when inactive language `EN`', () => {
    const data = {
      ...defaultMockData, 
      heroBannerData: {
        logo: defaultMockData.heroBannerData.logo,
        about: 'conócenos',
        cvCTA: {
          text: 'Ver CV',
          href: 'https://alexgines.netlify.app/'
        },
        description: 'He pasado gran parte de mi vida entre España, Francia, Reino Unido y Estados Unidos. Actualmente vivo en Berlín, donde trabajo como Ingeniero Front-End en Zalando SE',
        headline: 'Soy traductor de formación, profesor de vocación y desde 2016 desarrollador web',
        kicker: 'bienvenid@ a mi web!'
      },
      state: {
        languages: {
          active: 'ES',
          inactive: 'EN'
        }
      }
    }
    renderHeroBanner(data);
    const { inactive } = data.state.languages;
    const languageSwitchBtn = screen.getByText(inactive);
    const { about, cvCTA, description, headline, kicker } = data.heroBannerData; 
    expect.assertions(6);
    expect(languageSwitchBtn).toHaveTextContent('EN');
    expect(screen.getByRole('heading', {name: kicker})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: headline})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: description})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: cvCTA.text})).toBeInTheDocument();
    expect(screen.getByText(about)).toBeInTheDocument();
  });

  it('has a link to cv', () => {
    renderHeroBanner();
    const { heroBannerData } = defaultMockData;
    expect.assertions(1);
    expect(screen.getByText(heroBannerData.cvCTA.text).closest('a')).toHaveAttribute('href', heroBannerData.cvCTA.href);
  });

  describe('it fires scrollTo for the different breakpoints', () => {
    it('fires scrollTo function on mobile', () => {
      window.innerWidth = 600;
      const { container } = renderHeroBanner();
      const aboutBtnMobile = container.querySelector('#aboutButtonMobile');
      userEvent.click(aboutBtnMobile);
      expect.assertions(1);
      expect(scrollTo).toHaveBeenCalledTimes(1);
    });

    it('fires scrollTo function on tablet', () => {
      window.innerWidth = 900;
      const { container } = renderHeroBanner();
      const aboutBtnTablet = container.querySelector('#aboutButtonTablet');
      userEvent.click(aboutBtnTablet);
      expect.assertions(1);
      expect(scrollTo).toHaveBeenCalledTimes(2);
    });

    it('fires scrollTo function on Desktop', () => {
      window.innerWidth = 1900;
      const { container } = renderHeroBanner();
      const aboutBtnDesktop = container.querySelector('#aboutButtonDesktop');
      userEvent.click(aboutBtnDesktop);
      expect.assertions(1);
      expect(scrollTo).toHaveBeenCalledTimes(3);
    });
  });

  it('fires the toggleLanguage function on load', () => {
    renderHeroBanner();
    expect.assertions(1);
    expect(toggleLanguage).toHaveBeenCalled();
  });

  it('loads language switch button with initial style of fixedPosition', () => {
    const buttonText = defaultMockData.state.languages.inactive;
    const { container } = renderHeroBanner();
    const button = screen.getByText(buttonText)
    expect(getComputedStyle(button).getPropertyValue('position')).toEqual('fixed');
  });
 }) 