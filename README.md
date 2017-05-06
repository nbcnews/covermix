# Uncover

Mix Editors Lab

## Requirements

[node.js](https://nodejs.org/en/)

## How to Setup

### 1. Clone

```
git clone https://github.com/ianrose/machinist.git
```

### 2. Install Dependencies

```
$ npm install
```
### 3. Configure Project

Edit the `./config.json` as you see fit.

```json
{
  "name": "Person or Org",
  "title": "Global Title",
  "titleSeperator": "|",
  "domain": "blank.org",
  "url": "http://blank.org",
  "description": "Global Description",
  "keywords": null,
  "dest": "./www/",
  "src": "./src/",
  "assetPath": {
    "development": "/",
    "stage": "/",
    "production": "/"
  },
  "googleVerification": null,
  "analytics": {
    "provider": false,
    "google": {
      "trackingId": "GA-######"
    }
  },
  "twitter": {
    "username": "@username"
  },
  "facebook": {
    "username": null,
    "appId": null,
    "publisher": null
  },
  "openGraph": {
    "image": null
  },
  "googleDocJson": {
    "fileId": null,
    "output": "./src/data/models/archieExample.json"
  }
}
```

## How to use

### Develop

Runs your project locally at `localhost:3000` with BrowserSync. Edit contents of `./layouts`, `./lib`, `./partials`, and `./src`.

```
npm run dev
```

Develop with Metalsmith debugging.

```
npm run debug
``` 

### Build

Generates your dist to be deployed in the folder `./www`.

```
npm run build
```

### Lint

Lints your styles, scripts, and markup.

```
npm run lint
```

### Format

Fix lint errors in your styles and scripts.

```
npm run format
```
