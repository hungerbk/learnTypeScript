import React, { useState } from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

// 리액트에서 제공하는 파일임
// FC: functional component
const App: React.FC = () => {
  // const [todos, setTodos] = useState<{ id: string; text: string }[]>([]); // 타입 지정을 하지 않으면 타스가 이 값이 항상 빈 배열인 것으로 인식함!! > 업데이트를 할 수 없음. 그래서 어떤 값으로 업데이트될 것인지를 알려줘야 함
  const [todos, setTodos] = useState<Todo[]>([]); // 위랑 같은 건데 Todo 인터페이스를 임포트해서 사용. 다른 곳에서도 Todo를 쓸 수 있으니까 따로 빼줌

  const todoAddHandler = (text: string) => {
    // 입력하면 App.tsx에서 실행된다.
    // 여기에 console.log가 있기 때문.
    // NewTodo와 App 컴포넌트 간 상호작용이 이루어지고 있음
    // console.log(text);
    setTodos([{ id: Math.random().toString(), text: text }]);
    // 하지만 이 상태에서는 새로운 배열로 값이 변경될 뿐 기존 값에 새로운 값이 추가되지는 않음!
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
