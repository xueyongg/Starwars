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

export default class Person extends Component {
  static async getInitialProps({ id, person }) {
    // User's id is the url
    return { id, person };
  }

  state = {};

  componentWillMount() {
    // console.log(this.props);
    this.setState(this.props);
  }
  render() {
    let {} = this.state;
    return (
      <div>
        <Segment textAlign="center">
          <Header as="h1" />
        </Segment>
      </div>
    );
  }
}
