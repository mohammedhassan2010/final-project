const sign = document.querySelector("button");
const form = document.querySelector(".div");
const formData = form.childNodes;
const input1 = formData[1];
const input2 = formData[3];
const input3 = formData[5];
sign.addEventListener("click", (e) => {
  e.preventDefault();
  const name = input1.value.toLowerCase();
  const email = input2.value.toLowerCase();
  const password = input3.value.toLowerCase();

  if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
    const docRef = db.collection("profileInformation");

    const query = docRef
      .where("name", "==", name)

      .where("email", "==", email)
      .where("password", "==", password);

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          db.collection("profileInformation").add({
            name: name,
            email: email,
            password: password,
          });
        } else {
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    input1.value = "";
    input2.value = "";
    input3.value = "";
  } else {
    alert("this empty");
    return;
  }
});
