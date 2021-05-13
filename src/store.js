import { createStore, action } from 'easy-peasy';

export default createStore({
  appVersion: '1.0.3',
  loggedIn: localStorage.getItem('loggedIn') === 'true' ? true : false,
  setLoggedIn: action((state, payload) => {
    state.loggedIn = payload

    if (state.loggedIn) {
      localStorage.setItem('loggedIn', 'true');
    } else {
      localStorage.setItem('loggedIn', 'false');
    }
  }),
  globalLoading: true,
  setGlobalLoading: action((state, payload) => { state.globalLoading = payload }),
  mySky: null,
  setMySky: action((state, payload) => { state.mySky = payload }),
  contentRecordDAC: null,
  setContentRecordDAC: action((state, payload) => { state.contentRecordDAC = payload }),
  skynetClient: null,
  setSkynetClient: action((state, payload) => { state.skynetClient = payload }),
  userID: '',
  setUserID: action((state, payload) => { state.userID = payload }),
  userFilepath: '',
  setUserFilePath: action((state, payload) => { state.userFilepath = payload }),
  selectedGIF: localStorage.getItem('selectedGIF') ? JSON.parse(localStorage.getItem('selectedGIF')) : null,
  setSelectedGIF: action((state, payload) => {
    state.selectedGIF = payload
    localStorage.setItem('selectedGIF', JSON.stringify(payload))
  })
})