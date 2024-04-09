import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { create, del, done } from "../store/module/todo";
import { ReduxState } from "../types/interface";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoList() {
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Update");
  const todos = useRef<(HTMLInputElement | null)[]>([]);

  const list = useSelector((state: ReduxState) => state.todo.list);
  const todoList = list.filter((li) => li.done === false);
  console.log(todoList);

  const dispatch = useDispatch();
  const todoRef = useRef<HTMLInputElement>(null);
  const nextID = useSelector((state: ReduxState) => state.todo.nextID);

  const handleButtonClick = () => {
    if (disabled) {
      setDisabled(false);
      setButtonText("Save");
      todos.current[0]?.focus();
    } else {
      setDisabled(true);
      setButtonText("Update");
    }
  };

  const createTodo = () => {
    // dispatch({
    //   type: "todo/CREATE",
    //   payload: { id: 3, text: todoRef.current.value },
    // });
    // dispatch(create({ id: list.length, text: todoRef.current.value }));
    if (todoRef.current && todoRef.current.value.trim() !== "" && nextID) {
      dispatch(create({ id: nextID, text: todoRef.current.value }));
      axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
        text: todoRef.current.value,
      });
      todoRef.current.value = "";
      todoRef.current.focus();
    }
  };

  const enterCreateTodo = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") createTodo();
  };

  const changeDone = async (todoId: number) => {
    dispatch(done(todoId));

    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
  };

  const deleteTodo = async (todoId: number) => {
    dispatch(del(todoId));

    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
  };
  return (
    <section className="TodoList">
      <h2>오늘의 할 일</h2>
      <div>
        <input
          type="text"
          placeholder="Todo"
          ref={todoRef}
          onKeyDown={(e) => enterCreateTodo(e)}
        />
        <button onClick={createTodo}>할 일 추가</button>
      </div>
      {todoList.length === 0 ? (
        <p>할일이 없어요...</p>
      ) : (
        <ul>
          {todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="text"
                  value={todo.text}
                  disabled
                  ref={(el) => (todos.current[todo.id] = el)}
                />
                <button onClick={handleButtonClick}>{buttonText}</button>
                <button onClick={() => changeDone(todo.id)}>완료</button>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="trashIcon"
                  onClick={() => deleteTodo(todo.id)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
