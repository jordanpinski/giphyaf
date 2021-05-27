import { createStore, action } from 'easy-peasy';
import { gifModel } from './gifModel';
import { mySkyModel } from './mySkyModel';

export const store = createStore({
    appVersion: '1.0.9',

    gifs: gifModel,
    mySky: mySkyModel,

    globalLoading: true,
    setGlobalLoading: action((state, payload) => { state.globalLoading = payload }),
    selectedGIF: localStorage.getItem('selectedGIF') ? JSON.parse(localStorage.getItem('selectedGIF')) : null,
    setSelectedGIF: action((state, payload) => {
      state.selectedGIF = payload
      localStorage.setItem('selectedGIF', JSON.stringify(payload))
    })
});
