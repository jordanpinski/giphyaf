import { createStore, action } from 'easy-peasy';
import { gifModel } from './gifModel';
import { mySkyModel } from './mySkyModel';

export const store = createStore({
    gifs: gifModel,
    mySky: mySkyModel,

    // Old state:
    appVersion: '1.0.6',
    globalLoading: true,
    setGlobalLoading: action((state, payload) => { state.globalLoading = payload }),
    userProfile: null,
    setUserProfile: action((state, payload) => { state.userProfile = payload }),
    selectedGIF: localStorage.getItem('selectedGIF') ? JSON.parse(localStorage.getItem('selectedGIF')) : null,
    setSelectedGIF: action((state, payload) => {
      state.selectedGIF = payload
      localStorage.setItem('selectedGIF', JSON.stringify(payload))
    })
});
