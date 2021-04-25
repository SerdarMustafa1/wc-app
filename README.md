## To do

The login page does not show errors if login credentials are wrong or another kind of errors, the login works only if the phone is online (of course) but do not check if the internet is available, code could be surely optimized

Going Live

When the app is running correctly in Expo it can be built to create a standalone version without code refactoring, but just adding a couple of information in the app and in Google develper console:
For Android

    Add the correct package.namein app.json (for example com.mycompany.myapp)
    Build an apk from your project
    Create Google certificate fingerprint with expo fetch:android:hashes and copy it
    Go to the Google Developer Credentials
    Click Create credentials, then API Key, and finally click RESTRICT KEY in the modal that pops up.
    Click the Android apps radio button under Key restriction, then click + Add package name and fingerprint.
    Save
    Click Create credentials, then OAuth client ID, then select the Android radio button.
    Fill the Signing-certificate fingerprint field and Package name field with same data as above
    Go to the Google Developer Credentials and find your API key.
    Open app.json and add your Google API Key to android.config.googleSignIn.apiKey
    Take Google Certificate Hash from above and add to app.json under android.config.googleSignIn.certificateHash
    When you use Google.logInAsync(..), pass in the OAuth client ID as the androidStandaloneAppClientId option

const result = await Google.logInAsync({ //CHANGE (or add) standalone keys hereiosStandaloneAppClientId: Constants.manifest.extra.IOS_STANDALONE_KEY,androidStandaloneAppClientId: Constants.manifest.extra.ANDROID_STANDALONE_KEY,});

    Also add the OAuth client ID to the whitelist of external client to Google configuration in Firebase

For IOS

    Add a bundleIdentifier to your app.json if you don't already have one.
    Open your browser to Google Developer Credentials
    Click Create credentials and then OAuth client ID, then choose IOS.
    Provide your bundleIdentifier in the Bundle ID field, then press Create.
    Add the given IOS URL scheme to your app.json under ios.config.googleSignIn.reservedClientId.
    Wherever you use Google.logInAsync, provide the OAuth client ID as the iosStandaloneAppClientId option (see above).
# wc-app
