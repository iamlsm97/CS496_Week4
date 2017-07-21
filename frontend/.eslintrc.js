// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "extends": "vue",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion": 8
  },
  "ecmaFeatures": {
    "es6": true,
    "es7": true,
    "classes": true
  },
  "plugins": [
    "html",
    "babel",
    "import",
    "vue",
    "async-await"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./webpack/webpack.config.dev.js"
      }
    }
  },
  "rules": {
    "comma-dangle": [1, "always-multiline"],
    "max-len": [1, 180, 4],
    "arrow-body-style": [0],
    "global-require": [0],
    "no-param-reassign": [0],
    "import/no-unresolved": [0],
    "async-await/space-after-async": 2,
    "async-await/space-after-await": 2,
    "no-var": 2,
  },
  "globals": {
    "fetch": false,
    "Headers": false,
    "localStorage": false
  }
}
