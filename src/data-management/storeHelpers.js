import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext } from 'react';

export const StoreContext = createContext();

export function useStore() {
    const store = React.useContext(StoreContext);
    if (!store) {
    throw new Error('cannot use `useStore` outside of a storeProvider');
    }
    return store;
}

export function useData() {
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
    )

    if (!data) {
      throw new Error('cannot use `useData` without data passed to a storeProvider');
    }
    return { data };
  }