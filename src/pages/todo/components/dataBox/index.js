import { useActions } from "../../../../hooks/useActions";
import "../style.scss";

const DataBox = ({ data }) => {
  const { showing } = useActions();

  const taskByData = data.map((item, index) => (
    <div onClick={() => showing(item)} key={index} className="taskByData">
      <div className="tab">
        <label
          onClick={() => showing(item)}
          className="tab-label"
          htmlFor="rd1"
        >
          {item.data} - ({item.tasks.length})
        </label>
      </div>
    </div>
  ));
  return <div className="data_box">{taskByData}</div>;
};

export default DataBox;
