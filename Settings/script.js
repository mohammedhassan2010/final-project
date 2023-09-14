const account = document.querySelector(".account");

db.collection("profileInformation").onSnapshot((doc) => {
  doc.forEach((element) => {
    const data = element.data();
    const name = data.name[0].toUpperCase();
    account.innerHTML += `
    <div class="div">
      <div class="profile-img">
        <h1 class="H">${name}</h1>
      </div>
      <div class="information">
        <div class="span">
          <span>Name: ${data.name} </span>
          
        </div>
        <div class="span">
          <span>Email: ${data.email} </span>
          
        </div>
        <div class="span">
          <span>Password: ${data.password} </span>
          
        </div>
      </div>
      <div class="delete">
      <p  onclick="deleteAccount(this, '${element.id}')">delete account</p>
    </div>
    </div>
  `;
  });
});

function deleteAccount(btn, docId) {
  const parent = btn.parentElement.parentElement;

  db.collection("profileInformation")
    .doc(docId)
    .delete()
    .then(() => {
      alert("doc deleted successfully");
    })
    .catch((error) => {
      alert("error in delete", error);
    });
}
