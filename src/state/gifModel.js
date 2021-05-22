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
        // console.log(`${dacDomain}}/${hostDomain}/posts/page_${pageNumber}.json`);
        const { data } = await mySky.getJSON(`${dacDomain}}/${hostDomain}/posts/page_${pageNumber}.json`);
        if (!data) return;

        console.log({data});
    }),
}