import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isdone: !todo.isdone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const editTodosInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    editTodosInputRef.current?.focus();
  }, [edit]);
  return (
    <form className="todosSingle" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="editTodosInput"
          ref={editTodosInputRef}
        />
      ) : todo.isdone ? (
        <s className="todosSingleText">{todo.todo}</s>
      ) : (
        <span className="todosSingleText">{todo.todo}</span>
      )}
      <span
        className="icon"
        onClick={() => {
          if (!edit && !todo.isdone) {
            setEdit(!edit);
          }
        }}
      >
        <AiFillEdit />
      </span>
      <span className="icon" onClick={() => handleDelete(todo.id)}>
        <AiFillDelete />
      </span>
      <span className="icon" onClick={() => handleDone(todo.id)}>
        <MdDone />
      </span>
    </form>
  );
};

export default SingleTodo;
