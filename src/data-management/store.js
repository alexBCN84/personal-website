import React, { createContext, useReducer } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { SET_ACTIVE_LANGUAGE } from './actions';

const initialState = {
    languages: { active: 'EN', inactive: 'ES' }
};

const store = createContext(initialState);
const { Provider } = store;

const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case SET_ACTIVE_LANGUAGE:
                return {...state, languages: action.languages}
            default:
                throw new Error();
        }
    }, initialState)
    const data = useStaticQuery(
        graphql`
          query {
            file(relativePath: { eq: "logo.png" }) {
              childImageSharp {
                fixed(width: 40, height: 40) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            allDataJson {
              edges {
                node {
                  ES {
                    kicker
                    headline
                    description
                    aboutChevronText
                    cvCTA {
                      text
                      href
                    }
                  }
                  EN {
                    kicker
                    headline
                    description
                    aboutChevronText
                    cvCTA {
                      text
                      href
                    }
                  }
                }
              }
            }
          }
        `
      );
      const logo = data.file.childImageSharp.fixed
      const { headline, kicker, description, cvCTA, aboutChevronText: about } = data?.allDataJson.edges[0].node[
        state?.languages.active
      ];
      const heroBannerData = {logo, headline, kicker, description, cvCTA, about}
    return <Provider value={{heroBannerData, dispatch, state}}>{children}</Provider>
}

export {store, DataProvider};