import React from "react"
import Layout from "@components/common/layout"
import SEO from "@components/common/seo"
import { HeroBanner, About, Projects } from '@components/landing';
import { DataProvider } from '../data-management/store';
import { useData } from '../data-management/storeHelpers';

const IndexPage = () => {
  const { data: rowData } = useData();
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://kobzrcjtza.execute-api.us-east-1.amazonaws.com/dev/readNotionPage/blog')
      const data = await response.json()
      return data
    }
    fetchData().then(data => console.log(data))
  }, [])
  return (
    <DataProvider data={rowData}>
      <Layout>
          <SEO title="Alejandro Gines" />
          <HeroBanner />
          <About />
          <Projects />
      </Layout>
    </DataProvider>
    
  )
}

export default IndexPage
