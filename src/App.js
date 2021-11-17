import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./helpers/routes";
import Todo from "./pages/todo";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "5%",
        width: "800px",
      }}
    >
      <>
        <Todo />
      </>
    </div>
  );
};

export default App;
