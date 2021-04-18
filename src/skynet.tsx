import react from 'react';
import { SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from "@skynetlabs/content-record-library";

const client = new SkynetClient('https://siasky.net/');
const hostApp = 'localhost';

type MySky = {
  mySky: any
  contentRecordDAC: any
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
  let contentRecordDAC;
  let skynetClient = client;
  let loggedIn = false;
  let userID = '';

  try {

    // Initiate MySky
    mySky = await client.loadMySky(hostApp);

    // Initialize DAC, auto-adding permissions.
    contentRecordDAC = new ContentRecordDAC();

    // Load dac into MySky
    // @ts-ignore
    await mySky.loadDacs(contentRecordDAC);
  
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
    contentRecordDAC,
    skynetClient,
    loggedIn,
    userID
  }
}

export {
  initMySky
}