import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { create, done } from "../store/module/todo";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const createTodo = () => {
    // dispatch({
    //   type: "todo/CREATE",
    //   payload: { id: 3, text: todoRef.current.value },
    // });
    if (nextID && todoRef.current) {
      dispatch(create({ id: donList.length, text: todoRef.current.value }));
      dispatch(create({ id: nextID, text: todoRef.current.value }));
      todoRef.current.value = "";
    }
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
                <FontAwesomeIcon icon={faTrash} />
                <span>{todo.text}</span>
                <button>다시 하기</button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
