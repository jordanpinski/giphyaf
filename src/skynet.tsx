import react from 'react';
import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
//import { FeedDAC } from "feed-dac-library";

const devMode = true;
const client = new SkynetClient('https://siasky.net/');
const dataDomain = devMode ? 'localhost' : 'giphyaf.hns';

let mySky: any;
let contentRecordDAC: any;

/**
 * Initializes MySky
 * @returns object - An object with the following properties: mySky, skynetClient, loggedIn, userID
 */
async function initMySky() : Promise<any> {
  let skynetClient = client;
  let loggedIn = false;
  let userID = '';

  try {

    // Initiate MySky
    mySky = await client.loadMySky(dataDomain, {
      dev: true,
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
  const indexFilePath = `crqa.hns/${dataDomain}/newcontent/index.json`;
  let entries;

  try {
    const { data: { pages }} = await mySky.getJSON(indexFilePath);
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
 * @param skynetClient 
 * @param mySky 
 * @param contentRecordDAC 
 * @param filePath 
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
  return new Promise(resolve => setTimeout(resolve, 2500));

  //return true;
}

/**
 * Uploads an image and returns the skylink & skylinkUrl.
 * @param file 
 */
async function uploadImage(file: any, skynetClient: any): Promise<{skylink: string, skylinkUrl: string}> {

  // Upload the image.
  console.log('uploading image')
  const { skylink } = await skynetClient.uploadFile(file);
  
  // Get the image's URL.
  console.log('getting image url')
  const skylinkUrl = await skynetClient.getSkylinkUrl(skylink);

  return {
    skylink,
    skylinkUrl
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