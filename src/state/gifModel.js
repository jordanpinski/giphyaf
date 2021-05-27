import { action, thunk } from 'easy-peasy';

export const gifModel = {
    // GIF State
    gifs: [],

    // GIF Setters
    setValidGifs: action((state, { gifs }) => {
        state.gifs = gifs;
    }),
    setInvalidGifs: action((state) => {
        state.gifs = [];
    }),

    // GIF Thunks
    fetchGifs: thunk(async (actions, { mySky, pageNumber }) => {
        const { hostDomain } = mySky;
        const { data } = await mySky.getJSON(`feed-dac.hns/${hostDomain}/posts/page_${pageNumber}.json`);
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

            for (const dac in mySky.dacs) {
                if (mySky.dacs[dac].dacDomain === 'feed-dac.hns') {
                    await mySky.dacs[dac].createPost(json);
                }
            }

        } catch (error) {
            console.error('Error uploading JSON', error);
        }
    })
}