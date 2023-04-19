module.exports = {
  "pugAttributeSeparator": "none",
  "pugCommentPreserveSpaces": "trim-all",
  "pugSortAttributes": "asc",
  "tabWidth": 2,
  "useTabs": false,
  "pugSortAttributesBeginning": [
    "^content$",
    "^color$",
    "^href$",
    "^rel$",
    "^sizes$",
    "^:?type$",
    "^:value$",
    "^:?placeholder$",
    "^:?src$",
    "^:?alt$",
  ],
  "pugSortAttributesEnd": [
    "^:(?!(width|height|loading|disabled|data-))",
    "^target$",
    "^:?width$",
    "^:?height$",
    "^:disabled$",
    "^:?data-"
  ],
  "plugins": [
    "@prettier/plugin-pug",
  ],
}