import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

type GoogleGeocodingResponse = {
  // get 에 전달한 값. 다른 것들도 많지만 우리가 필요한 것만 적어서 새로운 타입으로.
  results: { geometry: { location: { lat: number; lng: number } } }[];
  // 아래는 공식문서에서 나와있음
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then((response) => {
      // 강의에서는 오류가 안나는데 나는 오류가 난다....
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      // 불러오는 값이기 때문에 타입스크립트에서 타입 추론을 할 수 없음
      // 하지만 위에서 응답으로 어떤 값을 예상하는지는 알려줄 수 있음
      // get 이 제네릭 메서드이기 때문
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
