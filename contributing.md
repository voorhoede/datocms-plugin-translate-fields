# Contributing

## Development

Install all the project dependencies with:

```
npm install
```

Start the local development server with:

```
yarn start
```

The plugin will be served from [http://localhost:3000/](http://localhost:3000/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugin-sdk/build-your-first-plugin/).

## Publishing

Before publishing this plugin, make sure:

* you've properly described any configuration parameters in this README file;
* you've properly compiled this project's `package.json` following the [official rules](https://www.datocms.com/docs/plugins/publishing/);
* you've added a cover image (`cover.png`) and a preview GIF (`preview.gif`) into the `docs` folder.

When everything's ready, just run:

```
npm run publish
```
