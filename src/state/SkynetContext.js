import { createContext, useState, useEffect } from 'react';
import { SkynetClient } from 'skynet-js';

// To import DAC, uncomment here, and 2 spots below.
// import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { UserProfileDAC } from '@skynethub/userprofile-library';
import { FeedDAC } from 'feed-dac-library';

const SkynetContext = createContext(undefined);

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const PORTAL = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;
const DATA_DOMAIN = window.location.hostname === 'localhost' ? 'localhost' : 'giphyaf.hns';

// Initiate the SkynetClient
const client = new SkynetClient(PORTAL);

// Instantiate DACs
const userProfileDAC = new UserProfileDAC();
const feedDAC = new FeedDAC();

const SkynetProvider = ({ children }) => {
  const [skynetState, setSkynetState] = useState({
    client,
    mySky: null,
    userProfileDAC,
    feedDAC,
    dataDomain: DATA_DOMAIN,
  });

  useEffect(() => {
    // define async setup function
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(DATA_DOMAIN, {
          debug: false,
          dev: true,
        });

        // load necessary DACs and permissions
        await mySky.loadDacs(feedDAC, userProfileDAC);
        
        // replace mySky in state object
        setSkynetState({ ...skynetState, mySky });

      } catch (e) {
        console.error(e);
      }
    }

    // call async setup function
    if (!skynetState.mySky) {
      initMySky();
    }

    return () => {
      if (skynetState.mySky) {
        skynetState.mySky.destroy();
      }
    };
  }, [skynetState]);

  return (
    <SkynetContext.Provider value={skynetState}>
      {children}
    </SkynetContext.Provider>
  );
};

export { SkynetContext, SkynetProvider };