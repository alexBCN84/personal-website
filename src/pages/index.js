import React from "react"
import Layout from "@components/common/layout"
import SEO from "@components/common/seo"
import { Home, About, Blog, Contact, Projects, Resources } from '@components/landing';
import { Navbar } from '@components/common';
import { DataProvider } from '../data-management/store';
import { useData } from '../data-management/storeHelpers';

const IndexPage = () => {
  const { data: rowData } = useData();
  const pageRef = React.useRef(null);
  const navbarRef = React.useRef(null);
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://kobzrcjtza.execute-api.us-east-1.amazonaws.com/dev/readNotionPage/blog')
      const data = await response.json()
      return data
    }
    fetchData().then(data => console.log(data))
  }, [])

  React.useEffect(() => console.log(pageRef.current))
  React.useEffect(() => console.log(navbarRef.current))
  return (
    <DataProvider data={rowData}>
      <Layout ref={pageRef}>
          <SEO title="Alejandro Gines" />
          <Home />
          <Navbar ref={navbarRef}/>
          <About />
          <Blog />
          <Projects />
          <Resources />
          <Contact />
      </Layout>
    </DataProvider>
    
  )
}

export default IndexPage
