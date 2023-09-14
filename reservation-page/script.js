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
          Airport name : ${data.airportname}
        </p>
        <p class="date">flight date : ${data.flyTime}</p>
        <p class="status">flight status : ${data.planestatus}</p>
        <p class="timezone">timezone : ${data.planetimezone}</p>
        <p class="number">flight number : ${data.planenumber}</p>
</div>
      </div>

   
         
    `;
  });
});

// ? Start search
function searchFunc() {
  const input = document.querySelector(".search-input");
  const filter = input.value.toLowerCase();
  const results = document.getElementsByClassName("plane-timezone");

  for (let i = 0; i < results.length; i++) {
    const listItem = results[i].parentElement;

    if (results[i].textContent.toLowerCase().includes(filter)) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  }
}
// ? End search
