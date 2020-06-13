import React from "react";
import Table from "./../Table/Table";

const starter = (props) => {
  return (
    <div style={("display" = "inline-table")}>
      <Table dishes={props.veg} />
      <Table dishes={props.nonveg} />
    </div>
  );
};
export default starter;
