import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDNzZ2jaQHKVY5FfUZ7crHCWrYLJwV1iro',
  authDomain: 'cs52-corkboard.firebaseapp.com',
  databaseURL: 'https://cs52-corkboard.firebaseio.com',
  storageBucket: 'cs52-corkboard.appspot.com',
};

Firebase.initializeApp(config);

const database = Firebase.database();

module.exports = {
  fetchNotes: function fetchNotes(callback) {
    database.ref('notes').on('value', (snapshot) => {
      callback(snapshot);
    });
  },
};

