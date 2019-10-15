var btn = document.querySelector("#btn");
var url = "https://randomuser.me/api/";
var fullnameDisp = document.querySelector("#fullname"),
  emailDisp = document.querySelector("#email"),
  usernameDisp = document.querySelector("#username"),
  cityDisp = document.querySelector("#city"),
  avatarSrc = document.querySelector("#avatar");

btn.addEventListener("click", () => {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(displayErrors)
});

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
};

function parseJSON(res) {
  return res.json().then(function (data) {
    return data.results[0];
  });
}

function updateProfile(data) {
  let first = data.name.first[0].toUpperCase() + data.name.first.slice(1);
  let last = data.name.last[0].toUpperCase() + data.name.last.slice(1);
  fullnameDisp.innerText = first + " " + last;
  usernameDisp.innerText = data.login.username;
  emailDisp.innerText = data.email;
  cityDisp.innerText = data.location.city;
  avatarSrc.src = data.picture.medium;
}

function displayErrors(err) {
  console.log(err);
}