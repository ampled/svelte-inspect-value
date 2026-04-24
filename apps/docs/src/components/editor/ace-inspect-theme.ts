import ace from 'ace-builds'
import cssDark from './ace-inspect-theme.css?raw'
import cssLight from './ace-inspect-theme-light.css?raw'

export const inspectTheme: ace.Ace.Theme = {
  cssClass: 'ace-inspect',
  cssText: cssDark,
  padding: 0,
  isDark: true,
}
export const inspectThemeLight: ace.Ace.Theme = {
  cssClass: 'ace-inspect-light',
  cssText: cssLight,
  padding: 0,
  isDark: true,
}
