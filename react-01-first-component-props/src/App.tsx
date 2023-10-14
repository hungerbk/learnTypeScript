import React from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

// 리액트에서 제공하는 파일임
// FC: functional component
const App: React.FC = () => {
  const todos = [{ id: "t1", text: "Finish the course" }];
  return (
    <div className="App">
      <NewTodo />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
