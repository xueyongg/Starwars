import PropTypes from "prop-types";
import React, { Component } from "react";
import Person from "./person";
import CharacterList from "./home";
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

export default class Index extends Component {
  static async getInitialProps({ res }) {
    const url = "https://swapi.co/api/people"; // Get total number of people in starwars
    let response = await axios({ method: "GET", url }).catch(e =>
      console.log(e)
    );
    return { res: response.data };
    // call the api to get all data
    // return the data as props. Add those props into state to be rendered through iteration.
    // See if you can get a transition to display those profiles in a seperate segment, parallal to the main page
  }

  state = {};

  componentWillMount() {
    let currentState = {
      ...this.props,
      selectedPerson: "https://swapi.co/api/people/1/",
      activePage: 1
    };
    this.setState(currentState);
  }

  handlePageChange(event, data) {
    let { activePage } = data;
    // console.log("< from index.js activePage: ", activePage);
    this.setState({ ...this.state, activePage });
  }

  render() {
    let { res, selectedPerson, activePage } = this.state;
    // console.log("< from index.js: ", activePage);
    let { count, next, previous, results } = res;

    return (
      <div>
        <Segment>
          <Header as="h1" content="Welcome, Commander" textAlign="center" />
          <Header
            as="h4"
            content="What do you wish to find out?"
            textAlign="center"
          />
          <Divider />
          <Grid>
            <Grid.Row textAlign="center">
              <Grid.Column textAlign="center">
                <Pagination
                  defaultActivePage={1}
                  totalPages={Math.ceil(count / 10)}
                  onPageChange={(event, data) => {
                    this.handlePageChange(event, data);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column floated="left">
                <CharacterList
                  res={res}
                  selectedPerson={selectedPerson}
                  activePage={activePage}
                />
              </Grid.Column>
              <Grid.Column floated="right">
                <Container>
                  <Person id={selectedPerson} person={{ name: "me" }} />
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
