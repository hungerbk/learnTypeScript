import _ from "lodash";

// 특정한 변수를 선언할 수 있음
// 타입스크립트에 '걱정마. 이건 존재할거야. 우리가 저장하는 한'라고 알려주는 것
declare var GLOBAL: any;

console.log(_.shuffle([1, 2, 3]));

console.log(GLOBAL); // 이렇게 에러가 발생하고 있지만, index.html 에서 전역으로 선언한 변수를 우리는 사용할 수 있음
