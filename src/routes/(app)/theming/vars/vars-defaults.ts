const base16 = [
  ['--base00', ''],
  ['--base01', ''],
  ['--base02', ''],
  ['--base03', ''],
  ['--base04', ''],
  ['--base05', ''],
  ['--base06', ''],
  ['--base07', ''],
  ['--base08', ''],
  ['--base09', ''],
  ['--base0A', ''],
  ['--base0B', ''],
  ['--base0C', ''],
  ['--base0D', ''],
  ['--base0E', ''],
  ['--base0F', ''],
]

export default [
  ...base16,
  ['--inspect-background', 'none'],
  ['--inspect-font-size', '12px'],
  ['--inspect-font', 'monospace'],
  ['--inspect-min-width', '360px'],
  ['--inspect-max-width', '100%'],
  ['--inspect-width', '100%'],
  ['--background-color', '--base00'],
  ['--hover-color', '--base01'],
  ['--text-selection-background', '--base02'],
  ['--text-search-highlight-color', '--base0A'],
  ['--indent-color', '--base03'],
  ['--indent', '0.75em'],
  ['--indent-compact', '0.5em'],
  ['--padding', '0.25em 0'],
  ['--padding-compact', '0.25em 0'],
  ['--length-color', '--base03'],
  ['--border-color', '--base03'],
  ['--border-radius', '8px'],
  ['--bullet-color', '--base03'],
  ['--comment-color', '--base03'],
  ['--caret-color', '--base03'],
  ['--key-whitespace-color', '--base03'],
  ['--key-whitespace-opacity', '0.5'],
  ['--tools-background-color', '--base00'],
  ['--tools-background-color-borderless', 'transparent'],
  ['--tools-border-color', '--base03'],
  ['--caret-focus-color', '--base05'],
  ['--caret-hover-color', '--base05'],
  ['--text-color', '--base05'],
  ['--child-update-flash-color', '--base05'],
  ['--update-flash-color', '--base06'],
  ['--delimiter-color', '--base08'],
  ['--key-prefix-color', '--base08'],
  ['--note-color', '--base08'],
  ['--button-color', '--base0E'],
  ['--button-disabled-color', '--base03'],
  ['--button-success-color', '--base0B'],
  ['--promise-pending-color', '--base0A'],
  ['--promise-fulfilled-color', '--base0B'],
  ['--promise-rejected-color', '--base0E'],
  ['--promise-bracket-color', '--base03'],
  ['--error-color', '--base08'],
  ['--string-value-color', '--base0A'],
  ['--function-name-color', '--base0B'],
  ['--function-var-color', '--base0E'],
  ['--function-attribute-color', '--base0E'],
  ['--function-comment-color', '--base03'],
  ['--function-params-color', '--base09'],
  ['--function-property-color', '--base0B'],
  ['--symbol-value-color', '--base0C'],
  ['--regex-value-color', '--base0C'],
  ['--number-value-color', '--base0E'],
  ['--bigint-value-color', '--base0E'],
  ['--boolean-value-color', '--base0E'],
  ['--class-name-color', '--base0D'],
  ['--niltype-bg-color', '--base01'],
  ['--niltype-text-color', '--base05'],
  ['--number-type-color', '--base08'],
  ['--bigint-type-color', '--base08'],
  ['--boolean-type-color', '--base08'],
  ['--symbol-type-color', '--base09'],
  ['--regex-type-color', '--base0B'],
  ['--array-type-color', '--base0C'],
  ['--date-type-color', '--base0C'],
  ['--map-type-color', '--base0C'],
  ['--set-type-color', '--base0C'],
  ['--url-type-color', '--base0C'],
  ['--urlsearchparams-type-color', '--base0C'],
  ['--object-type-color', '--base0C'],
  ['--class-type-color', '--base08'],
  ['--function-type-color', '--base08'],
  ['--string-type-color', '--base0E'],
] as const
