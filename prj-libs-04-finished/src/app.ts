import axios from "axios";

// 서드파티 라이브러리
// 1. axios: 자체 타입을 가져옴 2. CDN: npm으로 설치하지 않아도 적절한 타입 패키지 추가 3. npm

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

// declare var google: any;
// CDN으로 가져오기 때문에 전역적으로 google을 쓸 수 있지만, 타스에선 모르기 때문에 에러 발생. 위처럼 작성하면 에러는 사라짐. 하지만 타입 제공은 하지 않음..

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      // @types/googlemaps 설치로 타입제공도 가능해짐
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates, //하드 코딩하지 않고 이렇게 하고 Marker를 추가하면 강의에선 오류가 사라짐.. (declare var google: any; 덕분에)
        zoom: 16,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
