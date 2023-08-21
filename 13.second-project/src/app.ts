const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GLOBAL_API_KEY = process.env.GOOGLE_MAP_API_KEY;

function searchAddressHandler(event: Event) {
  event.preventDefault(); // 기존 submit은 안 되게!
  const enteredAddress = addressInput.value;

  // send this to Google's API!
}

form.addEventListener("submit", searchAddressHandler);
