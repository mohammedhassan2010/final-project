const reservationsPage = document.querySelector(".reservations");
db.collection("reservation").onSnapshot((doc) => {
  doc.forEach((element) => {
    const data = element.data();

    reservationsPage.innerHTML += `
        <!-- <div class="cds">
    <img class="plane-img" src="${data.plane}">
    <h1 class="airport-name">${data.airportname}</h1>
    <h1 class="plane-time">${data.flyTime}</h1>
    <h1 class="plane-status">${data.planestatus}</h1>
    <h1 class="plane-timezone">${data.planetimezone}</h1>
    <h1 class="plane-number">${data.planenumber}</h1>
    </div> -->

   
      <div class="card">
      <div class="card-img">
        <img class="img"
          src="${data.plane}"
          alt=""
        />
      </div>
      <div class="card-text">
        <p class="name">
           ${data.airportname}
        </p>
        <p class="date"> ${data.flyTime}</p>
        <p class="status"> ${data.planestatus}</p>
        <p class="timezone">${data.planetimezone}</p>
        <p class="number">${data.planenumber}</p>
</div>
      </div>

   
         
    `;
  });
});
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
// ? Start search
function searchFunc() {
  const input = document.querySelector(".search-input");
  const filter = input.value.toLowerCase();
  const results = document.getElementsByClassName("timezone");

  for (let i = 0; i < results.length; i++) {
    const listItem = results[i].parentElement.parentElement;

    if (results[i].textContent.toLowerCase().includes(filter)) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  }
}
// ? End search
