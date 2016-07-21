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
  fetchNotes: (callback) => {
    database.ref('notes').on('value', (snapshot) => {
      callback(snapshot);
    });
  },
  addNote: (note) => {
    // Get a key for a new Post.
    const id = database.ref('notes').push().key;

    database.ref('notes').child(id).set(note);
  },
  deleteNote: (id) => {
    database.ref('notes').child(id).remove();
  },
  updateNotePosition: (x, y, id) => {
    database.ref('notes').child(id).update({ x, y });
  },
  updateNoteZindex: (zIndex, id) => {
    database.ref('notes').child(id).update({ zIndex });
  },
  updateNoteContent: (text, id) => {
    database.ref('notes').child(id).update({ text });
  },
};

