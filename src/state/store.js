import { createStore, action } from 'easy-peasy';
import { gifModel } from './gifModel';
import { mySkyModel } from './mySkyModel';

export const store = createStore({
    gifs: gifModel,
    mySky: mySkyModel,

    // Old state:
    appVersion: '1.0.7',
    globalLoading: true,
    setGlobalLoading: action((state, payload) => { state.globalLoading = payload }),
    
    selectedGIF: localStorage.getItem('selectedGIF') ? JSON.parse(localStorage.getItem('selectedGIF')) : null,
    setSelectedGIF: action((state, payload) => {
      state.selectedGIF = payload
      localStorage.setItem('selectedGIF', JSON.stringify(payload))
    })
});
