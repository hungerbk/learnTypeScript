namespace App {
  // Validation
  export interface Validatable {
    value: string | number;
    required?: boolean; // 선택사항이기 때문에 ? 추가. | undefined를 해도 같음
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    // != null 부분을 추가하면, 최소길이가 0이어도 검증을 실행함
    if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === "number") {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === "number") {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
  }
}
