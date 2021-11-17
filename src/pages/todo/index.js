import { useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "./../../hooks/useActions";

import "./components/style.scss";
import DataBox from "./components/dataBox";
import TasksForDay from "./components/tasksForDay";

function Todo() {
  const [newTask, setNewTask] = useState("");
  const [dataTask, setDataTask] = useState("");

  const { allTasks, show } = useSelector((state) => state.todo);
  const { setAllTasks, setTaskFromData, asyncSetAllTasks } = useActions();

  const addTask = (async = false) => {
    if (!newTask) {
      return;
    }
    const isThere = allTasks.some((item, index, arr) => item.data === dataTask);
    if (!isThere) {
      const tasks = [
        ...allTasks,
        {
          data: dataTask,
          tasks: [{ text: newTask, isDone: false, edit: true }],
        },
      ];
      if (async) {
        asyncSetAllTasks(tasks);
      } else {
        setAllTasks(tasks);
      }
      setNewTask("");
      setDataTask("");
      return;
    }

    const addTaskByData = allTasks.map((item) => {
      if (item.data === dataTask) {
        return {
          data: item.data,
          tasks: [...item.tasks, { text: newTask, isDone: false, edit: true }],
        };
      }
      return item;
    });
    if (async) {
      asyncSetAllTasks(addTaskByData);
    } else {
      setAllTasks(addTaskByData);
    }
    setNewTask("");
    setDataTask("");
  };

  const checkbox = (data) => {
    const newAllData = allTasks.map((item) => {
      if (item.data === data.data) {
        const newData = {
          data: item.data,
          tasks: item.tasks.map((item2) => {
            if (item2.text === data.text) {
              return { text: item2.text, isDone: !item2.isDone, edit: true };
            }
            return item2;
          }),
        };
        setTaskFromData(newData);
        return newData;
      }
      return item;
    });

    setAllTasks(newAllData);
  };

  const save = (data) => {
    const newAllData = allTasks.map((item) => {
      if (item.data === data.data) {
        const newData = {
          data: item.data,
          tasks: item.tasks.map((item2) => {
            if (item2.text === data.text) {
              return { text: data.newText, isDone: false, edit: true };
            }
            return item2;
          }),
        };
        setTaskFromData(newData);
        return newData;
      }
      return item;
    });

    setAllTasks(newAllData);
  };

  return (
    <>
      <div className="App">
        <div className="mainScreen">
          <div className="field">
            <input
              type="text"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              placeholder="New task"
            />
            <input
              type="date"
              value={dataTask}
              onChange={(e) => {
                setDataTask(e.target.value);
              }}
            />
            <button type="button" onClick={() => addTask(false)}>
              Add
            </button>

            <button
              type="button"
              style={{ marginLeft: "3px" }}
              onClick={() => addTask(true)}
            >
              Add Async
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <DataBox data={allTasks} />
            {!show ? null : <TasksForDay checkbox={checkbox} save={save} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
