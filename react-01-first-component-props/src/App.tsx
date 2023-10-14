import React from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

// 리액트에서 제공하는 파일임
// FC: functional component
const App: React.FC = () => {
  const todos = [{ id: "t1", text: "Finish the course" }];

  const todoAddHandler = (text: string) => {
    // 입력하면 App.tsx에서 실행된다.
    // 여기에 console.log가 있기 때문.
    // NewTodo와 App 컴포넌트 간 상호작용이 이루어지고 있음
    console.log(text);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
