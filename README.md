<a href="https://easyindie.app"><img alt="Project logo" src="https://static.rosano.ca/eas/identity.svg" width="64" /></a>

# [Easy Indie App](https://easyindie.app)

_Run your own X, in a few clicks._

## Architecture

The project is a large collection of mostly small modules and functions. With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Development Setup

Install [Node.js and npm](https://nodejs.org/en/download/), then:

```
npm run setup
```

This should create an `.env` file if there is none. If you encounter errors referring to this file, you can find missing variables in `.env-sample`.

## Running

```
npm start
```

It should be accessible at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

## Testing

### Run logic tests

```
npm test 
```

### Run interface tests

```
npm test ui
```

To filter interface test paths by string:

```
npm test ui match=vitrine
```

To filter interface test paths by JavaScript regular expressions:

```
npm test ui match='/(list|robots)/'
```

## ❤️

If you’re enjoying this, consider [contributing to my Open Collective](https://opencollective.com/rosano/contribute). Virtually everything I create is public, accessible for free, and open-source. Your support helps me keep adding to the commons and making it available for everyone.

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).
