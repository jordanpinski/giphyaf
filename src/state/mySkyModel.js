import { action, thunk, computed } from 'easy-peasy';
import HeaderActions from '../components/Header/HeaderActions';

export const mySkyModel = {
    // MySky State
    userID: null,
    mySky: null,
    loggedIn: computed((state) => !!state.userID),

    // MySky Setters
    setMySky: action((state, { mySky }) => {
        state.mySky = mySky
    }),
    setValidUserID: action((state, { userID }) => {
        state.userID = userID;
    }),
    setInvalidUserID: action((state) => {
        state.userID = null
    }),
    setUserID: thunk((actions, { userID }) => {
        if (userID) {
            actions.setValidUserID({ userID })
        } else {
            actions.setInvalidUserID()
        }
    }),

    // MySky Thunks
    logout: thunk(async (actions, { mySky }) => {
        await mySky.logout();
        actions.setUserID({ userID: null });
    }),
    login: thunk(async (actions, { mySky }) => {
        if (!mySky) return;

        try {
            const status = await mySky.requestLoginAccess();

            if (status) {
                actions.setUserID({ userID: await mySky.userID() });
            }
        } catch (error) {
            console.log(error);
        }
    }),
    checkLogin: thunk(async (actions, { mySky }) => {
        if (!mySky) return;
        actions.setMySky(mySky);

        try {
            const userID = await mySky.userID();

            if (userID) {
                actions.setUserID({ userID });
                return;
            }
            actions.setUserID({ userID: null });
        } catch (error) {
            console.log(error);
        }
    }),
    uploadFile: thunk(async (actions, { mySky, file }) => {
        try {
            // Upload the image.
            const { skylink } = await mySky.connector.client.uploadFile(file);
        
            // Get the image's URL.
            const skylinkUrl = await mySky.connector.client.getSkylinkUrl(skylink);

            return {
                skylinkUrl
            }
    
        } catch (error) {
            console.log(error);
        }
    })
}