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
  Progress,
  Pagination
} from "semantic-ui-react";
const axios = require("axios");

export default class CharacterList extends Component {
  static async getInitialProps({ res, selectedPerson, activePage }) {
    return { res, selectedPerson, activePage };
    // call the api to get all data
    // return the data as props. Add those props into state to be rendered through iteration.
    // See if you can get a transition to display those profiles in a seperate segment, parallal to the main page
  }

  state = {};
  componentWillMount() {
    console.log("< from home.js: ", this.props.activePage);
    this.setState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    let newUrl = "https://swapi.co/api/people/?page=" + nextProps.activePage;
    if (nextProps.activePage !== this.state.activePage) {
      let response = this.fetchNewData(newUrl);
      Promise.resolve(response).then(results => {
        this.setState({
          ...this.state,
          res: results.data,
          activePage: nextProps.activePage
        });
      });
    }
  }

  async fetchNewData(url) {
    let response = await axios({ method: "GET", url }).catch(e =>
      console.log(e)
    );
    return response;
  }

  handlePersonChange(event, data) {
    let { url, children } = data;
    this.setState({ ...this.state, selectedPerson: url });
    console.log(this.props);
    this.props.id = url;
  }

  render() {
    let { res } = this.state;
    let { count, next, previous, results } = res;

    return (
      <div>
        <Container style={{ padding: "0 0 0 5em" }}>
          <Header
            as="h2"
            content={`Chracter list (${count}) `}
            textAlign="center"
          />

          <List link>
            {results.map((person, i) => {
              return (
                <List.Item
                  key={i}
                  href="#"
                  url={person.url}
                  onClick={(event, data) => {
                    this.handlePersonChange(event, data);
                  }}
                >
                  {person.name}
                </List.Item>
              );
            })}
          </List>
        </Container>
      </div>
    );
  }
}
