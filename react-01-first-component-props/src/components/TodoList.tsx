import React from "react";

interface TodoListProps {
  items: { id: string; text: string }[];
}

// 컴포넌트가 받는 props에 대해 알려줘야 함
const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
