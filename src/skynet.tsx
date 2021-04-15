import react from 'react';
import { SkynetClient } from 'skynet-js';

const client = new SkynetClient('https://siasky.net/');
const hostApp = 'localhost';

type MySky = {
  mySky: any
  loggedIn: boolean
}

/**
 * Initializes MySky
 * @returns object - An object with the following properties: mySky, loggedIn
 */
async function initMySky() : Promise<MySky> {
  let mySky;
  let loggedIn = false;

  try {

    // Initiate MySky
    mySky = await client.loadMySky(hostApp);
  
    // Attempt silent login
    loggedIn = await mySky.checkLogin();

  } catch (e) {
    console.log(e);
  }
  return {
    mySky,
    loggedIn
  }
}

export {
  initMySky
}