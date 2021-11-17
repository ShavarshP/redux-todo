import { useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "./../../hooks/useActions";

import "./components/style.css";
import DataBox from "./components/dataBox";
import TasksForDay from "./components/tasksForDay";

function Todo() {
  const [newTask, setNewTask] = useState("");
  const [dataTask, setDataTask] = useState("");

  const { allTasks, show, taskFromData } = useSelector((state) => state.todo);
  const { setAllTasks, setTaskFromData, asyncSetAllTasks } = useActions();

  const addTask = (async = false) => {
    console.log(1);
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
          <div className="create_task">
            <input
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
            />

            <input
              type="date"
              value={dataTask}
              onChange={(e) => {
                setDataTask(e.target.value);
              }}
            ></input>
            <button onClick={() => addTask(false)}>add</button>
            <button onClick={() => addTask(true)}>add async</button>
          </div>
          <DataBox data={allTasks} />
        </div>
        {!show ? (
          <div></div>
        ) : (
          <TasksForDay data={taskFromData} checkbox={checkbox} save={save} />
        )}
      </div>
    </>
  );
}

export default Todo;
