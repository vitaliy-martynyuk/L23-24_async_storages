console.log(1);
console.log(2);
console.log(3);
setTimeout(() => {
  document.getElementById("test2").innerHTML = "ASDASDEWF";
}, 5000);
console.log(5);
console.log(6);
console.log(7);

const fetchData = async (url) => {
  //Promise варіант
  // fetch(url)
  //   .then((data) => {
  //     console.log(data);

  //     return data.text();
  //   })
  //   .then((response) => {
  //     document.getElementById("test").innerHTML = response;
  //   });
  //   .catch((error) => {
  //     console.log(error);
  //   })
  //   .finally(() => {
  //     console.log(123);
  //   });

  //async/await варіант
  try {
    const data = await fetch(url);
    if (!data.ok) {
      throw data;
    }
    const character = await data.json();
    document.getElementById("name").innerHTML = "Name: " + character.name;
    document.getElementById("species").innerHTML =
      "Species: " + character.species;
    document.getElementById("isAlive").innerHTML = "Alive: " + character.status;
  } catch (e) {
    console.log("error", e.status, e.type);
  } finally {
    console.log("executed");
  }
};

const button = document.getElementsByTagName("button")[0];

button.onclick = () => {
  const id = Math.floor(Math.random() * 50);
  fetchData(`https://rickandmortyapi.com/api/character/${id}`);
};

// 1. localStorage
// 2. sessionsStorage
// 3. cookies

localStorage.removeItem("name"), sessionStorage.clear();

const setCookie = (cName, cValue, cExpires) => {
  let expires = "";
  if (cExpires) {
    const date = new Date();
    date.setTime(date.getTime() + cExpires * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = cName + "=" + (cValue || "") + expires + "; path=/";
};

setCookie("name", "Vitaliy", 1);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const customerName = document.getElementById("customerName");
customerName.innerText = customerName.innerText + getCookie("name");
