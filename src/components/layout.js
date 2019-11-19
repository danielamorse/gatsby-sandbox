import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import "../styles/styles.scss"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="layout container">
      <div className="header columns">
        <div className="column is-one-third">
          <Link to={`/`}>
            <h3 className="site-title">{data.site.siteMetadata.title}</h3>
          </Link>
        </div>
        <div className="column">
          <Link to={`/components/`}>Components</Link>
        </div>
      </div>
      {children}
    </div>
  )
}
