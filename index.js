//get the container where we will put the information after we fetched
const cardContainer = document.querySelector(".card-container");

//a function for for fetching data, and throw if error
// can be reused for other fetching. This function returns a Promise
const fetchData = async (url) => {

  //await cause it will take time to fetch from the source;
  const res = await fetch(url);

  // checks if the response is ok, if not it throws an error
  if (!res.ok) {
    const message = `An error occurred, please try again. ${res.status}`;
    throw new Error(message);
  }

  return await res.json();
};

//This function waits for the fetch data to finished fetching so the data can be used for displaying on html page

const allData = async () => {

  // try/catch, so if the fetchData() will return an error we can diplay it on catch
  try {

    // wait till the fetchData is done fetching and store it on users variable
    const users = await fetchData("https://jsonplaceholder.typicode.com/users");

    // Mapped the users to access each object in an array
    // and access each object with dot notation and used the specific values
    // using += we add an element inside the cardContainer
    users.map(
      (data) =>
        (cardContainer.innerHTML += createCard(
          data.name,
          data.email,
          data.address,
        )),
    );

    //For debugging, log user
    console.log(users);
  } catch (error) {
    
    // This will handle the error, it will print on console and display on the page
    console.error("Fetch error: ", error.message);
    cardContainer.innerHTML = `<p class="error">Failed to load users. Please try again.</p>`;
  }
};

// A reusable function for creating card,
// this takes 3 parameters: name, email, address
const createCard = (name, email, address) => {

  return `<div class=card>
    <h1>${name}</h1>
    <hr>
    <a class="email" href='https://mail.google.com/mail/?view=cm&fs=1&to=${email.trim(" ")}' target="_blank">${email.trim(" ")} </a>
    <p>${address.city} City</p>
  </div>`;

};

//this will automatically invoke the function once the page is loaded/access
allData();
