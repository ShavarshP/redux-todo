import { useActions } from "../../../../hooks/useActions";
import "../style.css";

const DataBox = ({ data }) => {
  const { showing } = useActions();

  const taskByData = data.map((item, index) => (
    <div onClick={() => showing(item)} key={index} className="taskByData">
      <div className="taskByData">
        <div>{item.data}</div>
        <div>({item.tasks.length})</div>
      </div>
      <div></div>
    </div>
  ));
  return <div className="data_box">{taskByData}</div>;
};

export default DataBox;
