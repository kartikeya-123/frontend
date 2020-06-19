import React from "react";
import Table from "./../Table/Table";
import classes from "./Starter.css";
const starter = (props) => {
  return (
    <div>
      <section className={classes.row}>
        <div className={classes.column1}>
          <Table dishes={props.veg} />
        </div>
        <div className={classes.column2}>
          <Table dishes={props.nonveg} />
        </div>
      </section>
    </div>
  );
};
export default starter;
