import { createStore, action } from 'easy-peasy';

export default createStore({
  loggedIn: localStorage.getItem('loggedIn') === 'true' ? true : false,
  setLoggedIn: action((state, payload) => {
    state.loggedIn = payload

    if (state.loggedIn) {
      localStorage.setItem('loggedIn', 'true');
    } else {
      localStorage.setItem('loggedIn', 'false');
    }
  }),
  mySky: null,
  setMySky: action((state, payload) => { state.mySky = payload }),
  skynetClient: null,
  setSkynetClient: action((state, payload) => { state.skynetClient = payload }),
  userID: '',
  setUserID: action((state, payload) => { state.userID = payload })
})