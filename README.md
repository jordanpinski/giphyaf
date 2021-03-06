# giphyaf

Developed for the Built to Explore - A Dream of the Future Hackathon

With giphyaf you can easily upload GIFs and share them with the world.

## Demo

You can view the demo at: https://giphyaf.hns.siasky.net/

## Planned Features

- More options/formats & a better UX when creating GIFs.
- Adding a feed of all GIFs created by every user.
- Adding search

## Changelog

### v1.0.8
- Fixed avatar bug.

### v1.0.7
- Added profile avatar.
- Added profile link to user menu.
- Updated skynet-js (4.0.8-beta).
- Fixed bug where created GIF didn't have a name.

### v1.0.6
- Refactored state management.
- Speed improvements.

### v1.0.5
- Fixed bug where DACs were being loaded multiple times.

### v1.0.4
- Began adding UserProfileDAC (0.1.10-beta).
- Fixed bug regarding the images aspect ratio when creating a GIF.

### v1.0.3
- Updated feed-dac library (0.2.2).
- Updated skynet-js (4.0.6-beta).
- GIF creator improvements
  - More options
  - Improved interface

### v1.0.2
- Updated skynet-js (4.0.3-beta).
- Fixed bug with skapp name when fetching data.
- Removed unnecessary console logs.

### v1.0.1
- Added hns domain giphyaf.hns
- Replaced Content Record DAC with [Feed DAC](https://github.com/redsolver/feed-dac-library).
- Fixed regex validation for the Title field in upload/create.
- Fixed the header layout on mobile.
- Fixed spacing issue after image was selected in create.