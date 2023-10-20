import { RequestHandler } from "express";
// 모든 클래스는 클래스이자 타입 역할을 하기 때문에 이렇게 하면 Todo를 타입으로 쓸 수 있음
import { Todo } from "../models/todos";

// 현재 메모리에서만 값을 저장하기 때문에 todo를 재설정하면 초기화됨. 서버가 다시 껐다 켜지기 때문. 실제 앱에선 데이터베이스에 저장하기 때문에 그러지 않음
const TODOS: Todo[] = [];

// app.ts에서 한 것처럼 변수마다 타입 설정을 하는 것이 좋지만 귀찮다. 이렇게 변수에 타입을 선언하고 해도 됨
export const createTodo: RequestHandler = (req, res, next) => {
  // 들어오는 값이 어떤 타입인지 모를 때는 형변환을 해줌
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  // 클라이언트에서도 사용할 수 있게 전송함
  res.status(201).json({ message: "Create the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  // 여기서 id는 우리가 router.patch("/:id"); 여기서 설정한 것임
  const todoId = req.params.id;

  const updateText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not fint todo!");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updateText);

  res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not fint todo!");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo deleted!" });
};
