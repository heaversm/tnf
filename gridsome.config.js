const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/styles/_vars.scss"),
        path.resolve(__dirname, "./src/styles/_mixins.scss"),
      ],
    });
}

module.exports = {
  chainWebpack(config) {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) => {
      addStyleResource(config.module.rule("scss").oneOf(type));
    });

    const svgRule = config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader");
  },
  // templates: { //MH - to link to each page's separate collection. Need the `templates/collection` from _bak
  //   ContentfulCollection: '/collection/:slug',
  // },
  plugins: [
    {
      use: "@gridsome/source-contentful",
      options: {
        space: process.env.CONTENTFUL_SPACE, // required
        accessToken: process.env.CONTENTFUL_TOKEN,
        typeName: "Contentful",
        host: "cdn.contentful.com",
        environment: process.env.CONTENTFUL_ENVIRONMENT,
      },
    },
    {
      use: "gridsome-plugin-sass-resources-loader",
      options: {
        resources: "./node_modules/hamburgers/_sass/hamburgers/hamburgers.scss",
      },
    },
  ],
};
