// @ts-check
import { MarkdownPageEvent } from 'typedoc-plugin-markdown'

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  // app.renderer.postRenderAsyncJobs.push(async (renderer) => {
  //   // The navigation JSON structure is available on the navigation object.
  //   const navigation = renderer.navigation

  //   // This can be parsed to something else or written straight to a file:
  //   fs.writeFileSync('./navigation.json', JSON.stringify(navigation))
  // })

  app.renderer.on(MarkdownPageEvent.END, (page) => {
    page.contents = page.contents
      .replaceAll('LegacyComponentType', 'Component')
      .replaceAll('\\<', ' `<` ')
      .replaceAll('\\>', ' `>` ')
      .replaceAll(':   |', ':')
      .replaceAll('string & {\n  ', 'string & {')
      .replaceAll('.md', '')
      .replaceAll('\\{', ' `{` ')
      .replaceAll('\\}', ' `}` ')
      .replaceAll('*extends*', '`extends`')
      .replaceAll(/^optional /gm, '')
  })
}
