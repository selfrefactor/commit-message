# Lazy-helpers

## Dev mode

- `yarn start` to start dev server

- `node files/watch` to start watching files

## Deploy

- Change version in `lazy_helpers/manifest.json`

- Run `yarn build`

- Archive `lazy_helpers` folder

## Functionality

### Import bookmarks as JSON

Press icon when in `https://ilearnsmarter.com/`

### Alarm

- www.youtube.com/watch?v=TXDcCtynMyM#alarm=5.5

Alarm will start in 5h and 30m

### Slow scroll

Slow scrolling on the current page. Clicking on extension's button, while this functionality is active, stops the scrolling.

### Imgur

It gets activated from a landing page of Imgur subreddit.

It click on the first image of the collection and afterwards clicks on the next image after some seconds.

### German shortkeys

Instead of using German keyboard, 'alt+a' simulates clicking on 'ä'.

### Github search

Typing in search bar redirects to Github search, if the search starts with pipe `|` sign.  

### Youtube to audio

It gets activated from Youtube clip's URL.

It sends request to proxified localhost port, which in turn store the converted audio the the local drive.

### Google image

It gets activated from a result page of Google images.

It clicks on the first image and afterwards it start clicking on next image button after some seconds.

## TODO

- Override Imgur style so the image can look better at Chromebook screen

- Have a button to start time component with the latest timeComponentValue, instead of selecting it every time.

- Fix Reddit override style

- Google image - display image in larger frame as 'img src' is visible

- Production mode

- remove `hot-reload.js` from manifest

- increment semver

- create temp directory

- zip temp directory