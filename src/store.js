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
  mySky: false,
  setMySky: action((state, payload) => {
    state.mySky = payload;
  }),
  mySkyLoading: true,
  setMySkyLoading: action((state, payload) => {
    state.loading = payload;
  })
})