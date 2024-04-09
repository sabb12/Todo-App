import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { del, undo } from "../store/module/todo";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function DoneList() {
  const donList = useSelector((state: ReduxState) => state.todo.list).filter(
    (li) => li.done === true
  );
  // console.log(list); // [{id, text, done}]

  // const todoList = list.filter((li) => li.done === true);
  // console.log(todoList);

  const dispatch = useDispatch();
  const todoRef = useRef<HTMLInputElement>(null);
  const nextID = useSelector((state: ReduxState) => {
    return state.todo.nextID;
  });

  const deleteTodo = async (todoId: number) => {
    dispatch(del(todoId));

    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
  };

  const changeUndo = async (todoId: number) => {
    dispatch(undo(todoId));

    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
  };
  return (
    <section className="DoneList">
      <h2>완료한 일</h2>

      {donList.length === 0 ? (
        <p>다한게 없어요</p>
      ) : (
        <ul>
          {donList.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => changeUndo(todo.id)}
                />
                <span>{todo.text}</span>
                <button onClick={() => changeUndo(todo.id)}>다시하기</button>
                <FontAwesomeIcon
                  icon={faTrash}
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
