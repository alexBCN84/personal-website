const config = require('./src/data/config');

module.exports = {
  siteMetadata: {
    title: config.defaultTitle,
    description: config.defaultDescription,
    author: config.author,
  },
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/logo.png`, // This path is relative to the root of the site.
      },
    },

    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-module-resolver`,
      options: {
        root: `./src`, // <- will be used as a root dir
        aliases: {
          '@data-management': './data-management',
          '@components': './components', // <- will become ./src/components
          '@utils': './utils',
          // helpers: './helpers', // <- will become ./src/helpers
          static: {
            root: './public', // <- will used as this alias' root dir
            alias: './static' // <- will become ./public/static
          }
        }
      }
    }
  ],
}
