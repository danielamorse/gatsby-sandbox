import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SideBar from "../components/sidebar"

export default ({ data, pageContext }) => {
  const component = data.boltManifestJson
  const { schema } = component
  const { next, prev } = pageContext
  const hasSpacer = next && prev

  return (
    <Layout>
      <div className="columns section">
        <div className="column is-one-third">
          <SideBar active={component.basicName}></SideBar>
        </div>
        <div className="column">
          <div>
            <h1>{schema.title}</h1>
            <p>{schema.description}</p>
            {prev && <Link to={`/${prev.basicName}`}>&laquo; Previous</Link>}
            {hasSpacer && <span className="spacer">|</span>}
            {next && <Link to={`/${next.basicName}`}>Next &raquo;</Link>}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    boltManifestJson(id: { eq: $id }) {
      name
      basicName
      schema {
        title
        description
        type
      }
    }
  }
`
