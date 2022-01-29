import React from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const handleDone = (id: number) => {
    console.log(id);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isdone: !todo.isdone } : todo
      )
    );
  };
  return (
    <form className="todosSingle">
      {todo.isdone ? (
        <s className="todosSingleText">{todo.todo}</s>
      ) : (
        <span className="todosSingleText">{todo.todo}</span>
      )}
      <span className="icon">
        <AiFillEdit />
      </span>
      <span className="icon">
        <AiFillDelete />
      </span>
      <span className="icon" onClick={() => handleDone(todo.id)}>
        <MdDone />
      </span>
    </form>
  );
};

export default SingleTodo;
