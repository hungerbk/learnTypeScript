import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GLOBAL_API_KEY = process.env.GOOGLE_MAP_API_KEY;

function searchAddressHandler(event: Event) {
  event.preventDefault(); // 기존 submit은 안 되게!
  const enteredAddress = addressInput.value;

  //encodeURI(): 입력받은 것을 url 호환 가능한 문자로 변환하는 함수
  axios
    .get(`https://maps.googleapis.com/maps/api/staticmap?${encodeURI(enteredAddress)}&amp;KEY_OR_CLIENT=${GLOBAL_API_KEY}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
