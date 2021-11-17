/* eslint-disable react-hooks/exhaustive-deps */
import "../style.scss";
import { useEffect, useMemo, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useSelector } from "react-redux";

const TasksForDay = ({ save, checkbox }) => {
  const { allTasks, taskFromData } = useSelector((state) => state.todo);
  const { deleteData, edit, cancel, setTaskFromData } = useActions();
  const [text, setText] = useState("");

  const { setShow } = useActions();

  useEffect(() => {
    setText("");
  }, [taskFromData]);

  const tasks = taskFromData.tasks;
  const changOfTask = allTasks.find((item) => item.data === taskFromData.data);

  useEffect(() => {
    setTaskFromData(changOfTask);
  }, [changOfTask.tasks.length]);

  const DateAllTasks = useMemo(
    () =>
      tasks.map((item, index) => (
        <div
          key={index}
          className="field"
          style={{ backgroundColor: "white", width: "500px", margin: "10px" }}
        >
          {item.edit ? (
            <input
              type="checkbox"
              style={{ marginTop: "7px", width: "25px", height: "25px" }}
              onChange={() =>
                checkbox({ text: item.text, data: taskFromData.data })
              }
              checked={item.isDone}
            />
          ) : (
            <></>
          )}
          {item.edit ? (
            <sub
              style={{
                width: "400px",
                fontSize: "124%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.text}
            </sub>
          ) : (
            <input
              style={{
                width: "400px",
                fontSize: "105%",
              }}
              onChange={
                text
                  ? (e) => {
                      setText(e.target.value);
                    }
                  : setText(item.text)
              }
              value={text}
            />
          )}
          <button
            onClick={() =>
              item.edit
                ? (function () {
                    edit(taskFromData, item.text);
                  })()
                : save({
                    text: item.text,
                    newText: text,
                    data: taskFromData.data,
                  })
            }
          >
            {item.edit ? "edit" : "save"}
          </button>
          <button
            style={{ marginLeft: "1px" }}
            onClick={() =>
              item.edit
                ? deleteData(allTasks, {
                    text: item.text,
                    data: taskFromData.data,
                  })
                : cancel(taskFromData)
            }
          >
            {item.edit ? "delete" : "cancel"}
          </button>
        </div>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [taskFromData, changOfTask.tasks.length, text]
  );

  return (
    <div className="tasks_for_day_box">
      <div className="flex">
        <button
          onClick={() => setShow(false)}
          style={{ padding: "10px", backgroundColor: "#819090" }}
        >
          Close
        </button>
        <div>{taskFromData.data}</div>
      </div>
      <div>{DateAllTasks}</div>
    </div>
  );
};

export default TasksForDay;
