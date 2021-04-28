# giphyaf

Developed for the Built to Explore - A Dream of the Future Hackathon

With giphyaf you can easily upload GIFs and share them with the world.

## Issues

This app uses the Content Record DAC to pull information for all previous uploads. After uploading/creating a GIF Sometimes the content record isn't updated before the user returns to their home page which shows all of their GIFs. If this happens you'll need to manually refresh the page.

## Demo

You can view the demo at: https://giphyaf.hns.siasky.net/

## Planned Features

- More options/formats & a better UX when creating GIFs.
- Adding a feed of all GIFs created by every user.
- Adding search

## Changelog
### v1.0.1
- Added hns domain giphyaf.hns
- Replaced Content Record DAC with [Feed DAC](https://github.com/redsolver/feed-dac-library).
- Fixed regex validation for the Title field in upload/create.
- Fixed the header layout on mobile.
- Fixed spacing issue after image was selected in create.

### v1.0.2
- Updated skynet-js (4.0.3-beta).
- Fixed bug with skapp name when fetching data.
- Removed unneccesary console logs.