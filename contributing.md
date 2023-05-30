# Contributing

## Development

Install all the project dependencies with:

```
npm ci
```

Start the local development server with:

```
npm start
```

The plugin will be served from [http://localhost:3000/](http://localhost:3000/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugins/creating-a-new-plugin/).

## Publishing

Before publishing this plugin, make sure:
* you've properly described any configuration parameters in the readme;
* you've updated the changelog with relevant information (see steps below);
* you've properly compiled this project's `package.json` following the [official rules](https://www.datocms.com/docs/plugin-sdk/publishing-to-marketplace).

When everything's ready:
1. Switch to the main branch and ensure it is up-to-date with remote.
1. Update `changelog.md` with relevant changes and stage with `git add`.
1. Run `npm version --force` with the appropiate version bump to include the changelog changes in the same commit.
1. This should automatically push the commit and new version tag to trigger publishing from CI.
