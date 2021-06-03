const weatheForm = document.querySelector("form");
const searchForm = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatheForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchForm.value;

  messageOne.textContent = "Loading weather..😃";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = location;
      }
    });
  });
});
