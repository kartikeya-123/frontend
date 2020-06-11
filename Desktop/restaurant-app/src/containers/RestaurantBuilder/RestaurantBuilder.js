import React, { Component } from "react";
import Aux from "./../../hoc/Auxil/Auxil";
import Starter from "./../../components/Starter/Starter";
class RestaurantBuilder extends Component {
  state = {
    startersVeg: {
      gobi: 100,
      manchuria: 200,
    },

    startersNonVeg: {
      chickenManchiria: 200,
      mutton: 160,
    },
  };

  render() {
    return (
      <Aux>
        <Starter
          veg={this.state.startersVeg}
          nonveg={this.state.startersNonVeg}
        />
      </Aux>
    );
  }
}

export default RestaurantBuilder;
