module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  globals: {
    Vue: false,
    weex: false,
    require: false
  },
  extends: "airbnb-base",
  plugins: ["html"],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': './webpack.config.js'
      }
    }
  },
  rules: {
    // // don't require .vue extension when importing
    // "import/extensions": [
    //   "error",
    //   "always",
    //   {
    //     js: "never",
    //     vue: "never"
    //   }
    // ],
    // "arrow-body-style": ["error", "always"],
    // // allow debugger during development
    // "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-unused-vars": 0,
    // "no-alert": 1,
    // "no-mixed-spaces-and-tabs": 0,
    // "no-console": 0,
    // "no-alert": 0,
    // "linebreak-style": 0,
    // "no-undef": 0,
    // "no-mixed-operators": 0,
    // "no-var": 0,
    // "space-before-function-paren": 0,
    // "eol-last": 0,
    // "prefer-template": 0,
    // "wrap-iife": 0,
    // "indent": ["error", 2, { "SwitchCase": 1 }],
    // "noe-var": 0,
    // "no-tabs": 0,
    semi: ["error", "never"],
    // "object-shorthand": 0,
    // "comma-dangle": 0,
    // "arrow-parens": 0,
    // "dot-notation": 0,
    // "no-trailing-spaces": 0,
    "no-param-reassign": 0,
    "no-shadow": 0,
    // "arrow-body-style": 0,
    // "no-plusplus": 0,


    "prefer-arrow-callback": 0,
    "quote-props": 0,
    // "consistent-return": 0,
    // "no-new": 0,
    // "no-restricted-syntax": 0,
    // "no-dupe-keys": 0,
    "no-underscore-dangle": 0,
    // "guard-for-in": 0,
    // "no-useless-escape": 0,
    // "no-bitwise": 0,
    // "no-else-return": 0,
    // "one-var": 0,
    // "no-unused-expressions": 0,
    "func-names": 0,
    // "global-require": 0,

    // "radix": ["error", "as-needed"],

    "no-multi-assign": 0,
    // "max-len": 0,
    // "no-lonely-if": 0,
    // "prefer-const": 0,
    // "vars-on-top": 0,
    // "no-inner-declarations": 0,
    // "camelcase": 0,
    // "no-void": 0,
    // "no-use-before-define": 0,
    // "no-nested-ternary": 0,
    // "no-unneeded-ternary": 0,

    "no-useless-constructor": 0
  }
};
