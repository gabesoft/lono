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
    // Unresolved imports are caught by flow
    "import/no-unresolved": 0,

    // Useless rule which does not observe the flowtype settings
    "flowtype/no-types-missing-file-annotation": 0,

    // Require one of nesting or htmlFor but do not require both
    "jsx-a11y/label-has-for": [1, {
      "components": ["label"],
      "required": {
        "some": ["nesting", "id"]
      }
    }]
  }
};
