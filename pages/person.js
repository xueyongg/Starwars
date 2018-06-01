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
        <Segment>
          <Header as="h1" />
        </Segment>
      </div>
    );
  }
}
