import react from 'react';
import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';
import { ContentRecordDAC } from "@skynetlabs/content-record-library";

const client = new SkynetClient('https://siasky.net/');
const dataDomain = 'localhost';

/**
 * Initializes MySky
 * @returns object - An object with the following properties: mySky, skynetClient, loggedIn, userID
 */
async function initMySky() : Promise<any> {
  let mySky;
  let contentRecordDAC;
  let skynetClient = client;
  let loggedIn = false;
  let userID = '';

  try {

    // Initiate MySky
    mySky = await client.loadMySky(dataDomain);

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

async function upload(upload: UploadType, skynetClient: any, mySky: any, filePath: string): Promise<boolean> {

  const { file, title, tags } = upload;

  const { skylinkUrl } = await uploadImage(file, skynetClient);

  // Create the post JSON object.
  const json = {
    $schema: "sia://skystandards.hns/v1/post.schema.json",
    id: Date.now(),
    content: {
      media: {
        image: [
          {
            ext: file.type,
            url: skylinkUrl,
          }
        ]
      },
      topics: tags,
      ts: Date.now()
    }
  };

  try {

    await appendUserPosts(filePath, json, mySky);
    await appendGlobalPosts(json, skynetClient);

    // Record event in DACs

  } catch (error) {
    console.error('Error uploading JSON', error);
  }

  return true;
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

/**
 * Appends the users JSON file that records each post.
 */
async function appendUserPosts(filePath: string, json: any, mySky: any) {

  try {
    // Get JSON record for all of the current users posts.
    const { data } = await mySky.getJSON(`${filePath}/posts/data.json`);

    // Append new post to the JSON record.
    if (data) {
      console.log('Appending new post')
      await mySky.setJSON(`${filePath}/posts/data.json`, [json, ...data])
    } else {
      await mySky.setJSON(`${filePath}/posts/data.json`, [json]);
    }
  } catch (error) {
    console.error(error);
  }

}

/**
 * Appends a global JSON record that references every post. Used for the home page feed.
 * Definitly not a long term solution ^
 * @param json 
 * @param skynetClient 
 */
async function appendGlobalPosts(json: any, skynetClient: any) {
  const { publicKey } = genKeyPairFromSeed('hello this is giphyaf sounding off');

  try {
    
    // Get the file.
    console.log('getting global posts file');
    const { data, skylink } = await skynetClient.db.getJSON(publicKey, dataDomain);

    if (data) {
      console.log('setting JSON')
      await skynetClient.db.setJSON(publicKey, dataDomain, [json, ...data]);
    } else {
      console.log('setting JSON')
      await skynetClient.db.setJSON(publicKey, dataDomain, [json]);
    }

  } catch (error) {
    console.error(error);
  }
}

async function getGlobalPosts(skynetClient: any) {
  const { publicKey } = genKeyPairFromSeed('hello this is giphyaf sounding off');
  let posts;

  try {
    const { data, skylink } = await skynetClient.db.getJSON(publicKey, dataDomain);
    posts = data;
  } catch(error) {
    console.log(error);
  }

  return posts;
}

export {
  initMySky,
  upload,
  getGlobalPosts
}

export type {
  UploadType
}