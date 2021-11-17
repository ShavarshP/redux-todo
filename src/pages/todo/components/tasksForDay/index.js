import "../style.css";
import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useSelector } from "react-redux";

const TasksForDay = ({ data, save, checkbox }) => {
  const { allTasks, taskFromData } = useSelector((state) => state.todo);
  const { deleteData, edit, cancel } = useActions();
  const [text, setText] = useState("");

  const { setShow } = useActions();

  const changeValue = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    setText("");
  }, [data]);
  const tasks = data.tasks;
  const DateAllTasks = tasks.map((item, index) => (
    <div key={index} className="taskByData">
      {item.edit ? (
        <input
          type="checkbox"
          onChange={() => checkbox({ text: item.text, data: data.data })}
          checked={item.isDone}
        />
      ) : (
        <></>
      )}
      {item.edit ? item.text : <input onChange={changeValue} value={text} />}
      <button
        onClick={() =>
          item.edit
            ? edit(taskFromData, item.text)
            : save({ text: item.text, newText: text, data: data.data })
        }
      >
        {item.edit ? "edit" : "save"}
      </button>
      <button
        onClick={() =>
          item.edit
            ? deleteData(allTasks, { text: item.text, data: data.data })
            : cancel(taskFromData)
        }
      >
        {item.edit ? "delete" : "cancel"}
      </button>
    </div>
  ));

  return (
    <div className="tasks_for_day_box">
      <div className="flex">
        <button onClick={() => setShow(false)}>go back</button>
        <div>{data.data}</div>
      </div>
      <div>{DateAllTasks}</div>
    </div>
  );
};

export default TasksForDay;
