import React from "react";
import Aux from "./../../hoc/Auxil/Auxil";
import classes from "./Table.css";
const table = (props) => {
  let content = Object.keys(props.dishes).map((dish, i) => {
    return (
      <tr>
        <td>{dish}</td>
        <td>{props.dishes[dish]}</td>
      </tr>
    );
  });
  return (
    <table className={classes.table}>
      <tr>
        <th>DISHES</th>
        <th>PRICES</th>
      </tr>
      {content}
    </table>
  );
};
export default table;
