const firebaseConfig = {
  apiKey: "AIzaSyBjb-p24wduE9m83tnhJjyD4715WXRtKho",

  authDomain: "final-project-c02f0.firebaseapp.com",

  projectId: "final-project-c02f0",

  storageBucket: "final-project-c02f0.appspot.com",

  messagingSenderId: "133002812",

  appId: "1:133002812:web:344e7928aaa5e9aadff539",

  measurementId: "G-3VW4T8C73B",
};

const fireBaseApp = firebase.initializeApp(firebaseConfig);
const db = fireBaseApp.firestore();

// reservation.forEach((item) => {

// });
// });
//   db.collection("tasks").onSnapshot((doc) => {
//     doc.forEach((element) => {
//       const data = element.data();
//       unCompleteList.innerHTML += `
//       `;

//     });
//   });
