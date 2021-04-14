import react from 'react';
// @ts-ignore  
import { SkynetClient } from 'skynet-js';

// interface SkynetProps {
//   portal: string
//   dataDomain: string
//   client: any
// }

// class Skynet implements SkynetProps {
//   portal: string
//   dataDomain: string
//   client: any
//   mySky: any
//   loggedIn: boolean
//   userID: string

//   constructor(portal: string, dataDomain: string) {
//     this.portal = portal !== '' ? portal : 'https://siasky.net/';
//     this.dataDomain = dataDomain !== '' ? dataDomain : 'localhost';
//     this.client = new SkynetClient(this.portal);
//     this.mySky = null;
//     this.loggedIn = false;
//     this.userID = '';
//     this.initMySky();
//   }

//   /**
//    * Initializes MySky
//    * @link https://github.com/SkynetLabs/skynet-workshop#part-3-make-it-dynamic-with-mysky
//    */
//   initMySky = async () => {
//     try {

//       // Load invisible iframe & define app's data domain needed for permissions write.
//       this.mySky = await this.client.loadMySky(this.portal);

//       // Check if the user is logged in.
//       this.loggedIn = await this.mySky.checkLogin();

//       if (this.loggedIn) {
//         this.userID = await this.mySky.userID();
//       }
      
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   login = async () => {
//     const status = await this.mySky.requestLoginAccess();
//     console.log({status})
//   }

//   /**
//    * Returns whether the user is logged in.
//    * @returns boolean
//    */
//   getLoggedIn = () => {
//     return this.loggedIn;
//   }

//   getUserID = () => {
//     return this.userID;
//   }

// }

const client = new SkynetClient('https://siasky.net/');

async function initMySky() {
  let mySky;
  try {

    mySky = await client.loadMySky('localhost');

  } catch (e) {
    console.log(e);
    return;
  }
  return mySky;
}

export {
  initMySky
}