const path = require(`path`)
const slug = require(`slug`)

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  } else if (node.internal.type === `DataJson`) {
    // Do something with JSON
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  /**
   * Create Markdown Pages
   */
  const mdResult = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  mdResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.fields) return
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/landing.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  /**
   * Create JSON Pages
   */
  const jsonResult = await graphql(`
    query {
      allBoltManifestJson(
        filter: { schema: { description: { ne: null }, title: { ne: null } } }
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
  `)

  const template = path.resolve(`./src/templates/detail.js`)

  const components = jsonResult.data.allBoltManifestJson.edges

  components.forEach(({ node }, index) => {
    const prev = index === 0 ? false : components[index - 1].node
    const next =
      index === components.length - 1 ? false : components[index + 1].node

    const path = slug(node.basicName)
    createPage({
      path,
      component: template,
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}
