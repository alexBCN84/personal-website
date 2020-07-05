import React from "react";
import renderer from "react-test-renderer";
import { PureHeroBanner as HeroBanner} from "./index";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import { setupIntersectionObserverMock } from "../../../__mocks__/intersection-observer"; 
import userEvent from '@testing-library/user-event';

 describe('HeroBanner', function(){

    beforeEach(setupIntersectionObserverMock);
    afterEach(cleanup); 

    let mockProps = {
      languages: { active: 'EN', inactive: 'ES' },
      setLanguage: jest.fn()
    }

    const data = {
      file: {
        childImageSharp: {
          fixed: {
            base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAC4jAAAuIwF4pT92AAACU0lEQVQ4y22Vz0tVURDH73u+vBFYIYhERItq3x8QEQgWZYsMikDoJ5VRq2zRxnDjRpAgqk3Zs0KJeBUtoq3VIgoKKgrLhH4aRLnQRT/o3T5D35Hxdg98mTnnzHzPnJk59yZZliU2TIJyooG+uV6vV5ET4JfwFgyDjuBXjhyRrGQ6JG3oL7N/4zcYY+0q8gq4J2Ib46y3B///yZAnZfwZ7MGhKckN1heBLvBBtn3zSHEqRzLmo4g0R3IAdIOdYKHWFoCqfPp0u7I7tOm0kUCSymit9h7psOW5wy5of2tcfIXxJydBNoTIR+RwRgVpdRvJkor1DlRsYYscdsugEnK6Rlc6jdgFbqG3eM7QK9K3i2OHLQ6rck3hRD/9rAxXgb3gJmgJ7eK3SMF3cMMmE5COFVS8VWRDmh/DruaEBdW/AyZN+Wm5Caf6NXpFeFQRHrEIQLMqvEJYKfvBTBFFQr/qYiXZx0ewX1c2wrta/2opVludcsLX4L4XRPKQHE6AjWAdOBwi7AT94JvsrLWuWbOb80XwBywJRXljzy+XI7tyzftQVbfRo/k0uJ0oAhsHtdEZ24hC+MvoRr8ufbVsHmjeoXmXn/5M+bBkPwYzoNEjDhE+gdTyOKXcL9PeOPgy92RR1uuEGg5DVoDQ5N7Em5CXdLUpf2rIc3NNnatsjzYux++iPUGbI0vKbxryel4+g952+W/hcRlY9fYxX1rQwKme2qSe5UDYK/wmbgDPRfwDPFTUVX1gZ7X3HmwLZKV5rCJtCFdtB5azpyqYRf0CjKoTKkW/gL+tuhI3CufaNQAAAABJRU5ErkJggg==",
            height: 40,
            src: "/static/b0ddc18a1e874e013ee42035351d5925/ff4be/logo.png",
            srcSet: "/static/b0ddc18a1e874e013ee42035351d5925/ff4be/logo.png 1x,/static/b0ddc18a1e874e013ee42035351d5925/183c2/logo.png 1.5x,/static/b0ddc18a1e874e013ee42035351d5925/829e2/logo.png 2x",
            width: 40
          }
        }
      },
      allDataJson: {
        edges: [
          {
            node: {
              EN: {
                description: "I've spent most of my life between Spain, France, the United Kingdom and the United States. I'm currently based in Berlin, where I work as a Frontend Engineer at Zalando SE",
                headline: "I am a former translator, a teacher at heart, and a Web Developer since 2016",
                kicker: "Welcome to my Site",
                aboutChevronText: "about us",
                cvCTA: {
                  href: "https://alexgines.netlify.app/",
                  text: "See my CV"
                }
              },
              ES: {
                aboutChevronText: "conócenos",
                cvCTA: {
                  href: "https://alexgines.netlify.app/",
                  text: "Ver CV"
                },
                description: "He pasado gran parte de mi vida entre España, Francia y Reino Unido. Actualmente vivo en Berlín, donde trabajo como Ingeniero Front-End en Zalando SE",
                headline: "Soy traductor de formación, profesor de vocación y desde 2016 desarrollador web",
                kicker: "bienvenid@ a mi web!"
              }
            }
          }
        ]
      }
    }

    it('renders desktop layout without crashing', () => {
      const {getByTestId} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByTestId('desktop')).toBeInTheDocument
    });

    // you can have as many snapshots as you want, it all depends on what props you pass into your component
    it('matches snapshot', function(){
      const tree = renderer.create(<HeroBanner  {...mockProps} data={data} />).toJSON()
      expect(tree).toMatchSnapshot()
    });
    it('displays logo appropriately', () => {
      const {getByText, getByRole} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByText('Alejandro Ginés')).toBeInTheDocument;
      expect(getByText('Web Developer')).toBeInTheDocument;
      expect(getByRole(/img/)).toBeInTheDocument;
    });
    it('shows text matching inactive language on language switch button', () => {
      const {getByText} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByText(mockProps.languages.inactive)).toBeInTheDocument
    });
    it('fires setLanguage function when user click on language button', () => {
      expect.assertions(1);
      const {getByText} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      const setLanguageMock = mockProps.setLanguage
      userEvent.click(getByText(mockProps.languages.inactive));
      expect(setLanguageMock).toHaveBeenCalledTimes(1);
    });
    it('shows content in English when activeLanguage is EN', () => {
      const {getByRole, getByText} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByRole('heading', {name: data.allDataJson.edges[0].node.EN.kicker})).toBeInTheDocument;
      expect(getByRole('heading', {name: data.allDataJson.edges[0].node.EN.headline})).toBeInTheDocument;
      expect(getByRole('heading', {name: data.allDataJson.edges[0].node.EN.description})).toBeInTheDocument;
      expect(getByRole('link', {name: data.allDataJson.edges[0].node.EN.cvCTA.text})).toBeInTheDocument;
      expect(getByText(data.allDataJson.edges[0].node.EN.aboutChevronText)).toBeInTheDocument;
    });
    it('shows content in Spanish when active language is ES', () => {
      mockProps = {
        languages: { active: 'ES', inactive: 'EN' },
        setLanguage: jest.fn()
      }
      const {getByRole, getByText} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByRole('heading', {name: data.allDataJson.edges[0].node.ES.kicker})).toBeInTheDocument;
      expect(getByRole('heading', {name: data.allDataJson.edges[0].node.ES.headline})).toBeInTheDocument;
      expect(getByRole('heading', {name: data.allDataJson.edges[0].node.ES.description})).toBeInTheDocument;
      expect(getByRole('link', {name: data.allDataJson.edges[0].node.ES.cvCTA.text})).toBeInTheDocument;
      expect(getByText(data.allDataJson.edges[0].node.ES.aboutChevronText)).toBeInTheDocument;
    });

    it('has a link to cv', () => {
      const {getByText} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByText(data.allDataJson.edges[0].node.ES.cvCTA.text).closest('a')).toHaveAttribute('href', data.allDataJson.edges[0].node.ES.cvCTA.href);
    });

    it('mobile layout  without crashing', () => {  
      window.innerWidth = 600;
      const {getByTestId} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByTestId('mobile')).toBeInTheDocument
     });

    // test intersection Observer
    it('gives languageButton fixed position if it is in viewport', () => {
      const originalGetBoundingClientRect = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'getBoundingClientRect')
      const {getByText} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      const switchButton = getByText(mockProps.languages.inactive)
      console.log(originalGetBoundingClientRect);
    }); 

     it('renders tablet layout without crashing', () => {
      window.innerWidth = 800;
      const {getByTestId} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
      expect(getByTestId('tablet')).toBeInTheDocument
    });
  
    // it('fires scrollTo function when about chevron is clicked', () => {
    //   window.innerWidth = 600;
    //   const {getByText} = render(<HeroBanner  {...mockProps} data={data} ></HeroBanner>)
    //   userEvent.click(getByText(data.allDataJson.edges[0].node.ES.aboutChevronText));
    //   screen.debug();
    //   console.log(document.getElementById('about').getBoundingClientRect().top)
    // });
   
 })