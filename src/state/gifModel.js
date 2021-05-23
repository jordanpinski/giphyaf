import { action, thunk } from 'easy-peasy';

export const gifModel = {
    // GIF State
    gifs: [],

    // GIF Setters
    setValidGifs: action((state, { gifs }) => {
        state.gifs = gifs;
    }),

    // GIF Thunks
    fetchGifs: thunk(async (actions, { mySky, userID, pageNumber }) => {
        const dacDomain = 'feed-dac.hns';
        const { hostDomain } = mySky;
        const { data } = await mySky.getJSON(`${dacDomain}/${hostDomain}/posts/page_${pageNumber}.json`);
        if (!data) return;

        actions.setValidGifs({ gifs: data.items })
    }),
    createGif: thunk(async (actions, { mySky, skylinkUrl, uploadData }) => {
        const json = {
            media: {
              image: {
                ext: uploadData.file.type,
                url: skylinkUrl
              }
            },
            title: uploadData.title,
            topics: uploadData.tags,
        }
        
        try {
            console.log({json, mySky});

            for (const dac in mySky.dacs) {
                console.log({dac})
                if (mySky.dacs[dac].dacDomain === 'feed-dac.hns') {
                    await mySky.dacs[dac].createPost(json);
                }
            }

        } catch (error) {
            console.error('Error uploading JSON', error);
        }
    })
}