import React, { useReducer } from 'react';
import { SET_ACTIVE_LANGUAGE } from './actions';
import PropTypes, { shape, arrayOf } from 'prop-types';
import { StoreContext } from './storeHelpers';

const initialState = {
    languages: { active: 'EN', inactive: 'ES' }
};

export const { Provider } = StoreContext;

export function reducer(state, action) {
  switch (action.type) {
      case SET_ACTIVE_LANGUAGE:
          return {...state, languages: action.languages}
      default:
          throw new Error('Could not find a case match');
  }
}

const DataProvider = ({ children, data }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const logo = data.file.childImageSharp.fixed
    const { headline, kicker, description, cvCTA, aboutChevronText: about, navigation } = data.allDataJson.edges[0].node[
      state.languages.active
    ];
    const homeData = {logo, headline, kicker, description, cvCTA, about}
  return <Provider value={{homeData, dispatch, state, navigation}}>{children}</Provider>
}

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
  data: shape({
    file: shape({
      childImageSharp: shape({
        fixed: shape({
          base64: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          src: PropTypes.string,
          srcSet: PropTypes.string
        })
      })
    }),
    allDataJson: shape({
      edges: arrayOf(shape({
        ES: shape({
          kicker: PropTypes.string,
          headline: PropTypes.string,
          description: PropTypes.string,
          aboutChevronText: PropTypes.string,
          cvCTA: shape({
            text: PropTypes.string,
            href: PropTypes.string
          }),
          navigation: shape({
            tabs: arrayOf(shape({
              text: PropTypes.string,
              link: PropTypes.string
            }))
          })
        }),
        EN: shape({
          kicker: PropTypes.string,
          headline: PropTypes.string,
          description: PropTypes.string,
          aboutChevronText: PropTypes.string,
          cvCTA: shape({
            text: PropTypes.string,
            href: PropTypes.string
          }),
          navigation: shape({
            tabs: arrayOf(shape({
              text: PropTypes.string,
              link: PropTypes.string
            }))
          })
        })
      }))
    }).isRequired
  })
}

export { DataProvider };