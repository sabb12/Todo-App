import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { create, done } from "../store/module/todo";
import { ReduxState } from "../types/interface";

export default function TodoList() {
  const list = useSelector((state: ReduxState) => state.todo.list);
  console.log(list); // [{id, text, done}]

  const todoList = list.filter((li) => li.done === false);
  console.log(todoList);

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
    // dispatch(create({ id: list.length, text: todoRef.current.value }));
    if (nextID && todoRef.current) {
      dispatch(create({ id: nextID, text: todoRef.current.value }));
      todoRef.current.value = "";
    }
  };
  return (
    <section className="TodoList">
      <h2>오늘의 할 일</h2>
      <div>
        <input type="text" placeholder="Todo" ref={todoRef} />
        <button onClick={createTodo}>할 일 추가</button>
      </div>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={() => dispatch(done(todo.id))}>완료</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
