import "reflect-metadata";
import { plainToClass } from "class-transformer"; //타입스크립트에서 잘 동작하지만 타입스크립트 지정 기능을 사용하는 것은 아님. 주로 타스에서 잘 동작되게 만들어졌지만 바닐라자바스크립트에서도 동작함(클래스는 자스에도 있는거니까)

import { Product } from "./product.model";
// import _ from "lodash";

const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 },
];

// products는 단순 json 데이터임. 인스턴스가 아님.
// 원래 이 객체를 인스턴스화하려면 우리가 아래와 같은 방식으로 수동으로 해야 함

// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products); // 첫번째 인수는 변환하고자 하는 클래스이고, 두번째 인수는 변환할 객체

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// const p1 = new Product("A Book", 12.99);
// console.log(p1.getInformation());

// 특정한 변수를 선언할 수 있음
// 타입스크립트에 '걱정마. 이건 존재할거야. 우리가 저장하는 한'라고 알려주는 것
// declare var GLOBAL: any;

// console.log(_.shuffle([1, 2, 3]));

// console.log(GLOBAL); // 이렇게 에러가 발생하고 있지만, index.html 에서 전역으로 선언한 변수를 우리는 사용할 수 있음
