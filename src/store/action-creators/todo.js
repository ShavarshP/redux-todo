// import axios from "axios";
// import { loadState } from "../../helpers/localStorage";
import { saveState } from "../../helpers/localStorage";
import { UserActionTypes } from "../../types/user";

// const API_URL = "http://localhost:5000/api";

// export const updateClickCount = () => {
//   return async (dispatch) => {
//     try {
//       const token = await loadState("accessToken");
//       await axios.put(`${API_URL}/update-click-count`, null, {
//         headers: {
//           Authorization: `Bearer ${token.accessToken}`,
//           withCredentials: true,
//         },
//       });
//       dispatch({
//         type: UserActionTypes.USER_DATA_UPDATE_CLICK,
//         payload: 1,
//       });
//     } catch (e) {
//       alert("invalid data");
//       dispatch({
//         type: UserActionTypes.FETCH_USER_ERROR,
//         payload: "An error has occurred",
//       });
//     }
//   };
// };

export const setAllTasks = (tasks) => {
  return (dispatch) => {
    // const tasksJson = JSON.stringify(tasks);
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
      console.log("serTim");
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
