import { saveState } from "../../helpers/localStorage";
import { UserActionTypes } from "../../types/user";

export const setAllTasks = (tasks) => {
  return (dispatch) => {
    saveState("todo", tasks);
    dispatch({
      type: UserActionTypes.CREAT_NEW_TASK,
      payload: tasks,
    });
  };
};
export const asyncSetAllTasks = (tasks) => {
  return async (dispatch) => {
    await setTimeout(() => {
      saveState("todo", tasks);
      dispatch({
        type: UserActionTypes.CREAT_NEW_TASK,
        payload: tasks,
      });
    }, 1000);
  };
};

export const setShow = (IsShow) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.IS_SHOW_TASK,
      payload: IsShow,
    });
  };
};
export const setTaskFromData = (data) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.TASK_FROM_DATA,
      payload: data,
    });
  };
};

export const showing = (data) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.SHOWING_DATA,
      payload: data,
    });
  };
};

export const cancel = (taskFromData) => {
  return (dispatch) => {
    const newTasks = taskFromData.tasks.map((item) => {
      return { text: item.text, isDone: false, edit: true };
    });
    dispatch({
      type: UserActionTypes.TASK_FROM_DATA,
      payload: { data: taskFromData.data, tasks: newTasks },
    });
  };
};

export const deleteData = (allTasks, data) => {
  return (dispatch) => {
    const newAllData = allTasks.map((item) => {
      if (item.data === data.data) {
        const newData = {
          data: item.data,
          // eslint-disable-next-line array-callback-return
          tasks: item.tasks.filter((item2) => {
            if (item2.text !== data.text) {
              return item2;
            }
          }),
        };
        return newData;
      }
      return item;
    });

    saveState("todo", newAllData);

    dispatch({
      type: UserActionTypes.CREAT_NEW_TASK,
      payload: newAllData,
    });
  };
};

export const edit = (taskFromData, text) => {
  return (dispatch) => {
    const newTasks = taskFromData.tasks.map((item) => {
      if (item.text === text) {
        return { text: item.text, isDone: false, edit: false };
      }
      return { text: item.text, isDone: false, edit: true };
    });
    dispatch({
      type: UserActionTypes.TASK_FROM_DATA,
      payload: { data: taskFromData.data, tasks: newTasks },
    });
  };
};
