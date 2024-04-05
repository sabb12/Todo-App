import { Todo, TodoState } from "../../types/interface";

const initialState: TodoState = {
  list: [],
};

// let CREATE = "todo/CREATE" as const;
const INIT = "todo/INIT" as const;
const CREATE = "todo/CREATE" as const;
const DONE = "todo/DONE" as const;

let count = initialState.list.length;
initialState["nextID"] = count;

export const init = (data: Todo[]) => ({
  type: INIT,
  data, // object {id, text, done}
});

// paylaod, // object {id, text}
export const create = (payload: { id: number; text: string }) => ({
  type: CREATE,
  payload,
});
// id, // number
export const done = (id: number) => ({ type: DONE, id });

interface Init {
  type: typeof INIT;
  data: Todo[];
}

// interface Action {
//   type: string;
//   id?: number;
//   payload?: { id: number; text: string };
// }

interface Create {
  type: typeof CREATE;
  payload: { id: number; text: string };
}
interface Done {
  type: typeof DONE;
  id: number;
}

type Action = Create | Done | Init;

export function todoReducer(state = initialState, action: Action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID:
          action.data.length === 0
            ? 1
            : action.data[action.data.length - 1].id + 1,
      };
    case CREATE:
      if (action.payload.text.trim() === "") return state;
      return {
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };
    case DONE:
      return {
        ...state,
        list: state.list.map((li) => {
          if (li.id === action.id) {
            return {
              ...li,
              done: true,
            };
          } else {
            return li;
          }
        }),
      };
    // case UNDO:
    //   return {
    //     ...state,
    //     list: state.list.map((li) => {
    //       if (li.id === action.id) {
    //         return {
    //           ...li,
    //           done: false,
    //         };
    //       } else {
    //         return li;
    //       }
    //     }),
    //   };
    default:
      return state;
  }
}
