import React from "react"
import Layout from "@components/common/layout"
import SEO from "@components/common/seo"
import { HeroBanner, About } from '@components/landing';
import { DataProvider } from '../data-management/store';
import { useData } from '../data-management/storeHelpers';

const IndexPage = () => {
  const { data: rowData } = useData();
  return (
    <DataProvider data={rowData}>
      <Layout>
          <SEO title="Alejandro Gines" />
          <HeroBanner />
          <About />
      </Layout>
    </DataProvider>
    
  )
}

export default IndexPage
