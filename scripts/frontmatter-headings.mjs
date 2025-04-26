// @ts-check
import _ from 'lodash'
import { MarkdownPageEvent } from 'typedoc-plugin-markdown'

const formatDefaultId = (value) => {
  return _.kebabCase(value.replace(/\\s+/g, ' ').trim())
}

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.on(
    MarkdownPageEvent.BEGIN,
    /** @param  {any} page */
    (page) => {
      /**
       * @type {string[]}
       */
      const children = page.model.children?.map((c) => c.name) ?? []
      page.frontmatter.title = [formatDefaultId(page.model.name), page.model.name]

      if (children.length) {
        page.frontmatter.children = children.map((c) => [formatDefaultId(c), c])
      }
      // const children = page.model.children?.map((c) => c.name))
      // if (page.model)
      // if (page.model.name)
      // console.log(page.pageSections.map((a) => a.headings))
      /**
       * Update page.frontmatter object using information from the page model
       *
       * Here if the page is a class, we set the title to the class name
       */
      // if (page.model?.kind == ReflectionKind.Class) {
      //   page.frontmatter = {
      //     // e.g add a title
      //     title: page.model?.name,
      //     // spread the existing frontmatter
      //     ...page.frontmatter,
      //   };
      // }
    }
  )
}
