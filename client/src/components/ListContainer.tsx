import axios from "axios";
import DoneList from "./DoneList";
import TodoList from "./TodoList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { init } from "../store/module/todo";

export default function ListContainer() {
  async function getTodoAll() {
    console.log(process.env.REACT_APP_API_SERVER);
    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
    console.log(res.data);
    if (res.data) dispatch(init(res.data));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getTodoAll();
  }, []);

  return (
    <div className="ListContainer">
      <TodoList />
      <DoneList />
    </div>
  );
}
