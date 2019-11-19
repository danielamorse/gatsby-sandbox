import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

export default props => {
  const { active } = props

  const getSidebarItems = (data, active) => {
    const sidebarItemsArray = []

    data.allBoltManifestJson.edges.forEach(({ node }) => {
      sidebarItemsArray.push(
        <li key={node.id} className={active === node.basicName && "is-active"}>
          <Link to={`/${node.basicName}`}>{node.schema.title}</Link>
        </li>
      )
    })

    return sidebarItemsArray
  }

  return (
    <StaticQuery
      query={graphql`
        query BoltManifestQuery {
          allBoltManifestJson(
            filter: {
              schema: { description: { ne: null }, title: { ne: null } }
            }
          ) {
            edges {
              node {
                id
                name
                basicName
                schema {
                  title
                  description
                  type
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div className="sidebar">
          <ul>{getSidebarItems(data, active)}</ul>
        </div>
      )}
    />
  )
}
