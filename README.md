<a href="https://easyindie.app"><img alt="Project logo" src="https://static.rosano.ca/easyindieapp/identity.svg" width="64" /></a>

# [Easy Indie App](https://easyindie.app)

_Run your own X, in a few clicks._

## Data compiled automatically from the following locations:

### Apps
- https://api.cloudron.io/api/v1/apps
- https://oneclickapps.caprover.com/v4/list
- https://app.yunohost.org/default/v2/apps.json

### Platforms
- https://github.com/0dataapp/awesome-0data

## Architecture

The project is a large collection of mostly small modules and functions. With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Development Setup

(For a deeper dive, watch [the tutorial](https://rosano.hmm.garden/01f62t5yseb053m024v1mczbzy)).

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

Help me keep creating projects that are public, accessible for free, and open-source.

<a href="https://rosano.ca/back"><img alt="Send a gift" src="https://static.rosano.ca/_shared/_RCSGiftButton.svg" /></a>

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to reach out on [Mastodon](https://rosano.ca/mastodon) or [Bluesky](https://rosano.ca/bluesky).
