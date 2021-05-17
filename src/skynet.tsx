import { SkynetClient } from 'skynet-js';
import { FeedDAC } from 'feed-dac-library';
//import { UserProfileDAC } from "@skynethub/userprofile-library";

const DEV_MODE = window.location.hostname === 'localhost';
const DATA_DOMAIN = 'feed-dac.hns';
const SKYNET_CLIENT = DEV_MODE ? new SkynetClient('https://siasky.net/') : new SkynetClient();
const SKAPP = window.location.hostname.includes('giphyaf.hns') ? 'giphyaf.hns' : window.location.hostname.split(".")[0];

let mySky: any;
let feedDAC: any;
let userProfileDAC: any;
let userID: string;
let userProfile: any = null;

/**
 * Initializes MySky
 * @returns object - An object with the following properties: mySky, skynetClient, loggedIn, userID
 */
async function initMySky() : Promise<any> {
  console.log('INITIALIZING SKYNET!');

  let loggedIn = false;

  try {

    // Initiate MySky
    mySky = await SKYNET_CLIENT.loadMySky(SKAPP, {
      dev: DEV_MODE,
      debug: true
    });

    // Initialize DACs, auto-adding permissions.
    feedDAC = new FeedDAC();
    //userProfileDAC = new UserProfileDAC();

    // Load dac into MySky
    await mySky.loadDacs(feedDAC, userProfileDAC);
  
    // Attempt silent login
    loggedIn = await mySky.checkLogin();

    if (loggedIn) {
      userID = await mySky.userID();
      //console.log(mySky.dacs)
      //userProfile = await mySky.getProfile(userID);
    }

  } catch (e) {
    console.log(e);
  }

  return {
    mySky,
    skynetClient: SKYNET_CLIENT,
    loggedIn,
    userID,
    userProfile
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
 * Uploads a GIF and records a new Feed DAC record.
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

    await feedDAC.createPost(json);

  } catch (error) {
    console.error('Error uploading JSON', error);
  }

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

// function debug(message: string) {
//   if (DEV_MODE) {
//     console.log(message);
//   }
// }

export {
  initMySky,
  createEntry,
  getUserEntries
}

export type {
  UploadType
}