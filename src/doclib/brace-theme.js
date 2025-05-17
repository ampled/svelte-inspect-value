// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

// eslint-disable-next-line no-undef
ace.define(
  'ace/theme/inspect',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function (acequire, exports, module) {
    exports.isDark = true
    exports.cssClass = 'ace-inspect'
    exports.cssText =
      '\
  ace-inspect .ace_gutter {\
  background: #1e2c3e;\
  color: rgb(144,145,148)\
  }\
  .ace-inspect .ace_print-margin {\
  width: 1px;\
  background: #e8e8e8\
  }\
  .ace-inspect {\
  background-color: #1e2c3e;\
  color: #f8f8f2\
  }\
  .ace-inspect .ace_cursor {\
  color: #f8f8f0\
  }\
  .ace-inspect .ace_marker-layer .ace_selection {\
  background: #44475a\
  }\
  .ace-inspect.ace_multiselect .ace_selection.ace_start {\
  box-shadow: 0 0 3px 0px #282a36;\
  border-radius: 2px\
  }\
  .ace-inspect .ace_marker-layer .ace_step {\
  background: rgb(198, 219, 174)\
  }\
  .ace-inspect .ace_marker-layer .ace_bracket {\
  margin: -1px 0 0 -1px;\
  border: 1px solid #3B3A32\
  }\
  .ace-inspect .ace_marker-layer .ace_active-line {\
  background: #44475a\
  }\
  .ace-inspect .ace_gutter-active-line {\
  background-color: #44475a\
  }\
  .ace-inspect .ace_marker-layer .ace_selected-word {\
  border: 1px solid #44475a\
  }\
  .ace-inspect .ace_fold {\
  background-color: #8fff96;\
  border-color: #f8f8f2\
  }\
  .ace-inspect .ace_keyword {\
  color: #ff5c7c\
  }\
  .ace-inspect .ace_constant.ace_language {\
  color: #ff8af4\
  }\
  .ace-inspect .ace_constant.ace_numeric {\
  color: #bd93f9\
  }\
  .ace-inspect .ace_constant.ace_character {\
  color: #ff8af4\
  }\
  .ace-inspect .ace_constant.ace_character.ace_escape {\
  color: #ff5c7c\
  }\
  .ace-inspect .ace_constant.ace_other {\
  color: #ff8af4\
  }\
  .ace-inspect .ace_support.ace_function {\
  color: #8be9fd\
  }\
  .ace-inspect .ace_support.ace_constant {\
  color: #6be5fd\
  }\
  .ace-inspect .ace_support.ace_class {\
  font-style: italic;\
  color: #66d9ef\
  }\
  .ace-inspect .ace_support.ace_type {\
  font-style: italic;\
  color: #66d9ef\
  }\
  .ace-inspect .ace_storage {\
  color: #ff5c7c\
  }\
  .ace-inspect .ace_storage.ace_type {\
  font-style: italic;\
  color: #8be9fd\
  }\
  .ace-inspect .ace_invalid {\
  color: #F8F8F0;\
  background-color: #ff5c7c\
  }\
  .ace-inspect .ace_invalid.ace_deprecated {\
  color: #F8F8F0;\
  background-color: #bd93f9\
  }\
  .ace-inspect .ace_string {\
  color: #ffd285\
  }\
  .ace-inspect .ace_comment {\
  color: #6272a4\
  }\
  .ace-inspect .ace_variable {\
  color: #50fa7b\
  }\
  .ace-inspect .ace_variable.ace_parameter {\
  font-style: italic;\
  color: #ffb86c\
  }\
  .ace-inspect .ace_entity.ace_other.ace_attribute-name {\
  color: #50fa7b\
  }\
  .ace-inspect .ace_entity.ace_name.ace_function {\
  color: #50fa7b\
  }\
  .ace-inspect .ace_entity.ace_name.ace_tag {\
  color: #ff5c7c\
  }\
  '

    const dom = acequire('../lib/dom')
    dom.importCssString(exports.cssText, exports.cssClass)
  }
)
