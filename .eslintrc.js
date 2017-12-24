module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true,
    jest: true
  },

  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      generators: "true",
      experimentalObjectRestSpread: true
    }
  },

  plugins: [
    "import",
    "flowtype",
    "jsx-a11y",
    "react"
  ],

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "plugin:flowtype/recommended"
  ],

  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  },

  rules: {
    // FIXME: this rule causes a crash in eslint in files containing flow
    // generic types
    "no-unused-vars": 0,

    // Unresolved imports are caught by flow
    "import/no-unresolved": 0,

    "flowtype/no-types-missing-file-annotation": 0
  }
};
