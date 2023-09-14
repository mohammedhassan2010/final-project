// * Start fetching and display data

const API =
  "http://api.aviationstack.com/v1/flights?access_key=3949385215fe06d068479e1530ea2a3e&limit=10";
let offset = 0;
async function fetchApi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

const cards = document.querySelector(".cards");
async function displayApiData(apiData) {
  apiData.data.map((fly) => {
    cards.innerHTML += `


<div class="card">
      <div class="card-img">
        <img
          class="img"
          src="https://www.freepnglogos.com/uploads/plane-png/plane-png-flights-airlines-msp-airport-1.png"
          alt=""
        />
      </div>
      <div class="card-text">
        <p class="name">Airport name : ${fly.arrival.airport}</p>
        <p class="date">flight date : ${fly.flight_date}</p>
        <p class="status">flight status : ${fly.flight_status}</p>
        <p class="timezone">timezone : ${fly.arrival.timezone}</p>
        <p class="number">flight number : ${fly.flight.number}</p>
        <div class="btn-div">
        <button class="reservation-btn" onclick="addData(this)">reservation</button>
        </div>
      </div>
    </div>
    `;
  });
}

async function display() {
  const apiData = await fetchApi(API);
  displayApiData(apiData);
}

display();
async function next() {
  cards.innerHTML = ``;
  offset = offset + 10;
  const nextPage = await fetchApi(`${API}&offset=+${offset}`);
  displayApiData(nextPage);
}
async function prev() {
  cards.innerHTML = ``;
  offset = offset - 10;
  const prevPage = await fetchApi(`${API}&offset=_${offset}`);
  setInterval(() => {
    displayApiData(prevPage);
  }, 20000);
}
// * End fetching and display data

// ! Start reservation
function addData(btn) {
  const reservationCard =
    btn.parentElement.parentElement.parentElement.previousSibling.nextSibling;
  console.log(reservationCard);
  const planeImg = reservationCard.querySelector(".img").src;
  const airportName = reservationCard.querySelector(".name").innerText;
  const flightTime = reservationCard.querySelector(".date").innerText;
  const planeStatus = reservationCard.querySelector(".status").innerText;
  const planeTimezone = reservationCard.querySelector(".timezone").innerText;
  const planeNumber = reservationCard.querySelector(".number").innerText;

  const docRef = db.collection("reservation");

  const query = docRef
    .where("plane", "==", planeImg)
    .where("airportname", "==", airportName)
    .where("flyTime", "==", flightTime)
    .where("planestatus", "==", planeStatus)
    .where("planetimezone", "==", planeTimezone)
    .where("planenumber", "==", planeNumber);

  query
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        db.collection("reservation").add({
          plane: planeImg,
          airportname: airportName,
          flyTime: flightTime,
          planestatus: planeStatus,
          planetimezone: planeTimezone,
          planenumber: planeNumber,
        });
      } else {
        return;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

// ! End reservation
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

//!const darkMode = document.querySelector("#dark");
//!const body = document.querySelector("body");
//!const nav = document.querySelector("nav");

//! darkMode.addEventListener("click", function () {
//!  this.classList.toggle("bi-moon");
//! if (this.classList.toggle("bi-brigthness-hight-fill")) {
//!   body.style.transition = "2s";
//!    body.style.background =
//!     "linear-gradient(10000deg, #793fdf, #97fff4, #7091f5)";
//!   nav.style.background = "linear-gradient(18deg, #793fdf, #97fff4)";
//! } else {
//!   body.style.background = "linear-gradient(10000deg, #35155D, #512B81)";
//!   nav.style.background = "linear-gradient(10000deg, #512B81, #4477CE)";
//!   body.style.transition = "2s";
//! }
//! });
const swiper = new Swiper(".swiper", {
  speed: 400,
  spaceBetween: 100,
  direction: "horizontal",
  loop: true,
  autoplay: true,
  slidesPerView: 1,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
