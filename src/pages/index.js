import React from "react"
import Layout from "@components/common/layout"
import SEO from "@components/common/seo"
import { HeroBanner, About } from '@components/landing';

const IndexPage = () => {
  const [languages, setLanguage] = React.useState({ active: 'EN', inactive: 'ES' });
  const languageSettings = { languages, setLanguage };

  return (
    <Layout>
        <SEO title="Alejandro Gines" />
        <HeroBanner {...languageSettings} />
        {/* <About /> */}
    </Layout>
    
  )
}

export default IndexPage
