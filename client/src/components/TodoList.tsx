import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { create, del, done, update } from "../store/module/todo";
import { ReduxState } from "../types/interface";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoList() {
  const [editId, setEditId] = useState<number | null>(null); // 수정 중인 할 일의 ID
  const [editText, setEditText] = useState<string>(""); // 수정 중인 할 일의 텍스트

  const list = useSelector((state: ReduxState) => state.todo.list);
  const todoList = list.filter((li) => li.done === false);
  console.log(todoList);

  const dispatch = useDispatch();
  const todoRef = useRef<HTMLInputElement>(null);
  const nextID = useSelector((state: ReduxState) => state.todo.nextID);

  const createTodo = () => {
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

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const finishEdit = async (id: number) => {
    if (editId !== null && editText.trim() !== "") {
      // 수정된 내용을 dispatch하여 업데이트
      dispatch(update(editId, editText));
      // PATCH /api-server/content

      await axios.patch(`${process.env.REACT_APP_API_SERVER}/content`, {
        text: editText,
        id: editId,
      });
      setEditId(null);
      setEditText("");
    }
    // 수정 중인 할 일의 ID와 수정 중인 텍스트 초기화
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
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => changeDone(todo.id)}
                />
                {editId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => finishEdit(todo.id)}>저장</button>
                  </>
                ) : (
                  <>
                    <span>{todo.text}</span>
                    <button onClick={() => changeDone(todo.id)}>완료</button>
                    <button onClick={() => startEdit(todo.id, todo.text)}>
                      수정
                    </button>
                  </>
                )}
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
