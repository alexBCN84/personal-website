import React from "react";
import renderer from "react-test-renderer";
import { PureHeroBanner } from "./index";


 describe('HeroBanner', function(){
    const mockProps = {
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
  
     it('renders correctly', function(){
        const tree = renderer.create(<PureHeroBanner  {...mockProps} data={data} />).toJSON()
        expect(tree).toMatchSnapshot()
     })
 })