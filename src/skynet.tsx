import react from 'react';
// @ts-ignore
import { SkynetClient } from 'skynet-js';
// @ts-ignore
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
//import { FeedDAC } from "feed-dac-library";

const devMode = false;
const client = devMode ? new SkynetClient('https://siasky.net/') : new SkynetClient();
const dataDomain = devMode ? 'localhost' : 'giphyaf.hns';

let mySky: any;
let contentRecordDAC: any;
let userID: string;

/**
 * Initializes MySky
 * @returns object - An object with the following properties: mySky, skynetClient, loggedIn, userID
 */
async function initMySky() : Promise<any> {
  let skynetClient = client;
  let loggedIn = false;

  try {

    // Initiate MySky
    mySky = await client.loadMySky(dataDomain, {
      dev: devMode,
      debug: true
    });

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

  console.log({mySky, skynetClient, userID})

  return {
    mySky,
    contentRecordDAC,
    skynetClient,
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
 * @param mySky
 */
async function getUserEntries(mySky: any): Promise<any> {
  const indexFilePath = `crqa.hns/${mySky.hostDomain}/newcontent/index.json`;
  let entries;

  try {
    console.log('getUserEntries', indexFilePath);
    const { data } = await mySky.getJSON(indexFilePath);
    console.log(data);
    const { pages } = data;
    entries = await getAllEntries(pages);

  } catch (error) {
    console.error(error);
  }

  return entries;
}

/**
 * Gets the data for all pages
 * @param page 
 */
async function getAllEntries(pages: string[]) {
  let entries: any[] = [];

  for (const page of pages) {
    try {
      const data = await mySky.getJSON(page);
      console.log({data});
      entries = [...entries, ...data.data.entries];
    } catch (error) {
      console.error(error);
    }
  };

  return entries;
}

/**
 * Uploads a GIF and records a new content record.
 * @param upload 
 * @returns boolean
 */
async function upload(upload: UploadType): Promise<any> {

  const { file, title, tags } = upload;

  const { skylinkUrl } = await uploadImage(file, client);

  // // Create the post JSON object.
  const json = {
    image: {
      ext: file.type,
      url: skylinkUrl,
    },
    title: title,
    tags: tags,
  };

  try {

    // Record event in content record DAC
    const status = await contentRecordDAC.recordNewContent({
      json,
      metadata: {'action': 'created'}
    });

  } catch (error) {
    console.error('Error uploading JSON', error);
  }

  // Artificial timeout so that DAC has enough time to update.
  return new Promise(resolve => setTimeout(resolve, 4500));
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
    console.log(`uploading image: ${file}`);
    const { skylink } = await skynetClient.uploadFile(file);
    tempSkylink = skylink;

    // Get the image's URL.
    console.log(`getting image url`);
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
  if (devMode) {
    console.log(message);
  }
}

export {
  initMySky,
  upload,
  getUserEntries
}

export type {
  UploadType
}