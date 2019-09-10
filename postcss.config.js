module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: "vw",
      selectorBlackList: [".ignore", ".hairlines"],
      minPixelValue: 1,
      mediaQuery: false
    },
    cssnano: {
      "cssnano-preset-advanced": {
        preset: "advanced",
        autoprefixer: false,
        "postcss-zindex": false,
        zindex: false
      }
    }
  }
};
