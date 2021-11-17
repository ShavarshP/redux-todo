import { UserActionTypes } from "../../types/user";

const initialState = {
  allTasks: localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [],
  show: false,
  taskFromData: [],
};

export const todo = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.IS_SHOW_TASK:
      return { ...state, show: action.payload };
    case UserActionTypes.CREAT_NEW_TASK:
      return { ...state, allTasks: action.payload };
    case UserActionTypes.TASK_FROM_DATA:
      return { ...state, taskFromData: action.payload };
    case UserActionTypes.SHOWING_DATA:
      return { ...state, taskFromData: action.payload, show: true };
    default:
      return state;
  }
};
