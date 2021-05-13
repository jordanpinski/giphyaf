import react from 'react';
// @ts-ignore
import { SkynetClient } from 'skynet-js';
// @ts-ignore
import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { FeedDAC } from 'feed-dac-library';

const DEV_MODE = window.location.hostname === 'localhost';
const DATA_DOMAIN = 'feed-dac.hns';
const SKYNET_CLIENT = DEV_MODE ? new SkynetClient('https://siasky.net/') : new SkynetClient();
const SKAPP = window.location.hostname.includes('giphyaf.hns') ? 'giphyaf.hns' : window.location.hostname.split(".")[0];

let mySky: any;
let contentRecordDAC: any;
let feedDAC: any;
let userID: string;

/**
 * Initializes MySky
 * @returns object - An object with the following properties: mySky, skynetClient, loggedIn, userID
 */
async function initMySky() : Promise<any> {
  let loggedIn = false;

  try {

    // Initiate MySky
    mySky = await SKYNET_CLIENT.loadMySky(SKAPP, {
      dev: DEV_MODE,
      debug: true
    });

    // Initialize DAC, auto-adding permissions.
    contentRecordDAC = new ContentRecordDAC();
    feedDAC = new FeedDAC();

    // Load dac into MySky
    await mySky.loadDacs(feedDAC);
  
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
    skynetClient: SKYNET_CLIENT,
    loggedIn,
    userID
  }
}

type UploadType = {
  file: any,
  title: string,
  tags: string[]
}

/**
 * Gets all content record entries for this data domain.
 * @param page
 */
async function getUserEntries(pageNumber: number = 0): Promise<any> {
  if (!mySky) return;
  
  //const indexFilePath = `${DATA_DOMAIN}/${SKAPP}/posts/index.json`;
  let entries = [];

  try {
    const { data } = await mySky.getJSON(`${DATA_DOMAIN}/${SKAPP}/posts/page_${pageNumber}.json`);
    entries = data ? data.items : [];
  } catch (error) {
    console.error(error);
  }

  return entries;
}

/**
 * Uploads a GIF and records a new content record.
 * @param upload 
 * @returns boolean
 */
async function createEntry(upload: UploadType) {

  const { file, title, tags } = upload;
  const { skylinkUrl } = await uploadImage(file, SKYNET_CLIENT);

  const json = {
    media: {
      image: {
        ext: file.type,
        url: skylinkUrl
      }
    },
    title: title,
    topics: tags,
  }

  try {

    // Record in FeedDAC
    await feedDAC.createPost(json);

  } catch (error) {
    console.error('Error uploading JSON', error);
  }

  // Artificial timeout so that DAC has enough time to update.
  return;
}

/**
 * Uploads an image and returns the skylink & skylinkUrl.
 * @param file 
 */
async function uploadImage(file: any, skynetClient: any): Promise<{skylink: string, skylinkUrl: string}> {

  let tempSkylink = '';
  let tempSkylinkUrl = '';

  try {
    // Upload the image.
    const { skylink } = await skynetClient.uploadFile(file);
    tempSkylink = skylink;

    // Get the image's URL.
    const skylinkUrl = await skynetClient.getSkylinkUrl(skylink);
    tempSkylinkUrl = skylinkUrl;

  } catch (error) {
    console.log(error);
  }

  return {
    skylink: tempSkylink,
    skylinkUrl: tempSkylinkUrl
  }

}

function debug(message: string) {
  if (DEV_MODE) {
    console.log(message);
  }
}

export {
  initMySky,
  createEntry,
  getUserEntries
}

export type {
  UploadType
}