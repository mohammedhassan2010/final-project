// * Start User Profile
const nav = document.querySelector("nav");
const signLog = document.querySelector(".sign-log");

const signUp = signLog.childNodes[1];
signUp.onclick = () => {
  window.location.href = "./sign up/index.html";
};
db.collection("profileInformation").onSnapshot((doc) => {
  doc.forEach((element) => {
    const docRef = db.collection("profileInformation");

    const query = docRef;

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
        } else {
          const data = element.data();

          const name = data.name[0].toUpperCase();

          signLog.innerHTML = `
       <h1 class="user-profile">${name}</h1>

      <ul class="dropdown-content">
  <li>${data.name}</li>
  <li>${data.email}</li>
  <li><a href="../Settings/index.html">Settings</a></li>
</ul>
               
          `;
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
});
// * End User Profile
