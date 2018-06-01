import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Progress
} from "semantic-ui-react";
const axios = require("axios");

export default class Person extends Component {
  static async getInitialProps({}) {
    const url = "https://swapi.co/api/people"; // Get total number of people in starwars
    axios({ url })
      .then(result => {
        if (result !== "404 error") {
        }
      })
      .catch(e => console.log(e));

    // call the api to get all data
    // return the data as props. Add those props into state to be rendered through iteration.
    // See if you can get a transition to display those profiles in a seperate segment, parallal to the main page
    return {};
  }

  state = {};

  componentWillMount() {
    this.state = this.props;
  }
  render() {
    let {} = this.state;
    return (
      <div>
        <Header as="h1" content="Welcome, Commander" />
        <Segment>
          <Header as="h2" />
          <List>
            <List.Item>test</List.Item>
          </List>
        </Segment>
      </div>
    );
  }
}
