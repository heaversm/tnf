# TNF Preview

### Getting Started

- `npm install`
- `gridsome develop`
- Visit [http://localhost:8080](http://localhost:8080) to view the site locally
- VIsit [http://localhost:8080/\_\_\_explore](http://localhost:8080/___explore) to view the GraphQL explorer

### Stack

[Gridsome](https://gridsome.org/) - Server side rendering
[Vue](https://vuejs.org/) - Javascript Framework
[Contentful](https://www.contentful.com/) - CMS

### Dependencies

- [Vue Carousel](https://ssense.github.io/vue-carousel/)
- [Zooming](https://github.com/kingdido999/zooming) - For pan / zoom interactions
- [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll) - animated scroll down the page
- [Inline SVG Loader](https://github.com/oliverfindl/vue-svg-inline-loader) - used for inline SVGs so that colors can be changed. Was necessary over typical `vue-svg` plugin due to issues on IE with webpack and inline svg.

### CMS

**Content Model**

- Each `Season` has a `Collection` and within each `Collection` are `Products`. A `Product` contains `Hotspot Images` that in turn contain `Hotspots`. All of this content is contained within a single `All Seasons` entry, which allows us to order the seasons and choose which season displays on the home page by ordering it first, rather than having to provide a specific entry in the code.

**NOTE**: The `All Seasons` entry should not be deleted as it is pulled by ID in the graphQL query.

- `Homepage` - Contains all of the supplementary content that appears above and in addition to each specific `Collection`.

- `Current Collaborators` contains an orderable list of the `Collaborators` listed on the Collaborators page. Similar to `All Seasons`, `Current Collaborators` is pulled by ID in the graphql and therefore should not be deleted.Each Collaborator has an orderable list of `Collaborator Links` to their social media / web sites.

### DEV CONSOLE ERRORS

**`window` is not defined**

This will happen if you try to include a javascript library that makes a reference to the browser `window` object, and that library is not set up to support server-side rendering.

In order to resolve this, you have two options:

- Load the component with a `try/catch` promse

```
components: {
  Carousel: () =>
    import("vue-carousel")
      .then((m) => m.Carousel)
      .catch(),
},
```

...and surround the component with Gridsome's `<ClientOnly>` tags:

```
<ClientOnly>
  <carousel/>
</ClientOnly>
```

or load the component on mount, with a `process.isClient` conditional:

```
if (process.isClient) {
  const Zooming = require("zooming").default;
  this.zooming = new Zooming();
}
```

This results in a second error on `gridsome build`, which does not affect the functionality / success of the build:

`UnhandledPromiseRejectionWarning: TypeError: Cannot read property '__esModule' of undefined. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch()`

This error seems to throw despite the presence of the try catch block in loading the module.
