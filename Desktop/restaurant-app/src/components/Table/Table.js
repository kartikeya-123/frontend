import React from "react";
import Aux from "./../../hoc/Auxil/Auxil";
import "./Table.css";
const table = (props) => {
  let content = Object.keys(props.dishes).map((dish, i) => {
    return (
      <Aux key={i + dish}>
        <tr>
          <th>{dish}</th>
          <td>{props.dishes[dish]}</td>
        </tr>
      </Aux>
    );
  });
  return (
    <table className="table">
      <tr>
        <th>DISHES</th>
        <th>PRICE</th>
      </tr>
      <tr>{content}</tr>
    </table>
  );
};
export default table;
