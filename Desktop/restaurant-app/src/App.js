import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import RestaurantBuilder from "./containers/RestaurantBuilder/RestaurantBuilder";
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <RestaurantBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
