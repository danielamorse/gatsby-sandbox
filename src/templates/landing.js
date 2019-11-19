import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SideBar from "../components/sidebar"

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <div className="columns section">
        <div className="column is-one-third">
          <SideBar></SideBar>
        </div>
        <div className="column">
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      excerpt
    }
  }
`
