import { action, thunk, computed } from 'easy-peasy';

export const mySkyModel = {
    // MySky State
    userProfile: null,
    userID: null,
    mySky: null,
    loggedIn: computed((state) => !!state.userID),

    // MySky Setters
    setMySky: action((state, { mySky }) => {
        state.mySky = mySky
    }),

    setValidUserProfile: action((state, { userProfile }) => {
        state.userProfile = userProfile;
    }),
    setInvalidUserProfile: action((state) => {
        state.userProfile = null;
    }),
    setUserProfile: thunk((actions, { userProfile }) => {
        if (userProfile) {
            actions.setValidUserProfile({ userProfile });
        } else {
            actions.setInvalidUserProfile({ userProfile });
        }
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
        actions.setUserProfile({ userProfile: null })
    }),
    login: thunk(async (actions, { mySky }) => {
        if (!mySky) return;

        try {
            const status = await mySky.requestLoginAccess();

            if (status) {
                const userID = await mySky.userID();
                const userProfile = await mySky.connector.client.file.getJSON(userID, 'profile-dac.hns/profileIndex.json');
                actions.setUserID({ userID });

                if (userProfile.data) {
                    actions.setUserProfile({ userProfile: userProfile.data.profile });
                }
                return;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }

        throw new Error('Login failed. The dialog box was closed before successfully signing in.');
    }),
    checkLogin: thunk(async (actions, { mySky }) => {
        if (!mySky) return;
        actions.setMySky(mySky);

        try {
            const userID = await mySky.userID();

            if (userID) {
                //const userProfile = await mySky.dacs[1].getProfile(userID);
                const userProfile = await mySky.connector.client.file.getJSON(userID, 'profile-dac.hns/profileIndex.json');
                actions.setUserID({ userID });

                if (userProfile.data) {
                    actions.setUserProfile({ userProfile: userProfile.data.profile });
                }
                return;
            }

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