import React, { useRef } from "react";

const NewTodo: React.FC = () => {
  // useRef를 실행하면 ref 객체가 반환되고 이를 상수에 할당할 수 있음
  // DOM과 상호작용하게 할 수 있음 (preventDefault()를 했더라도)
  // 렌더링되기 전에는 값이 없음 > 기본값 null을 입력해주는 이유
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // 타입스크립트에서는 ref가 연결이 되었는지 확싱할 수 없기 때문에 에러 발생 > !나 ? 넣어줌
    // 렌더링 이후에 서브밋되었을 때만 이 함수가 실행되는 것이기 때문에 null이 아니라는 것을 확신할 수 있음
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};

export default NewTodo;
