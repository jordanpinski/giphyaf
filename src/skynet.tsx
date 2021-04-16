import react from 'react';
import { SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from "@skynetlabs/content-record-library";

const client = new SkynetClient('https://siasky.net/');
const hostApp = 'localhost';

type MySky = {
  mySky: any
  skynetClient: any
  loggedIn: boolean
  userID: string 
}

/**
 * Initializes MySky
 * @returns object - An object with the following properties: mySky, skynetClient, loggedIn, userID
 */
async function initMySky() : Promise<MySky> {
  let mySky;
  let skynetClient = client;
  let loggedIn = false;
  let userID = '';

  try {

    // Initiate MySky
    mySky = await client.loadMySky(hostApp);

    // Initialize DAC, auto-adding permissions.
    const dac = new ContentRecordDAC();

    // @ts-ignore
    await mySky.loadDacs(dac);
  
    // Attempt silent login
    loggedIn = await mySky.checkLogin();

    if (loggedIn) {
      userID = await mySky.userID();
    }

  } catch (e) {
    console.log(e);
  }
  return {
    mySky,
    skynetClient,
    loggedIn,
    userID
  }
}

export {
  initMySky
}