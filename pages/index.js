import PropTypes from "prop-types";
import React, { Component } from "react";
import Head from "next/head";
import { Person } from "./person";
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
      selectedPersonId: "https://swapi.co/api/people/1/",
      selectedPersonObject: {},
      activePage: 1
    };
    this.setState(currentState);
  }

  handlePageChange(event, data) {
    let { activePage } = data;
    // console.log("< from index.js activePage: ", activePage);
    let newUrl = "https://swapi.co/api/people/?page=" + activePage;
    let response = this.fetchNewData(newUrl);
    Promise.resolve(response).then(results => {
      this.setState({
        ...this.state,
        res: results.data,
        activePage
      });
    });
  }

  async fetchNewData(url) {
    let response = await axios({ method: "GET", url }).catch(e =>
      console.log(e)
    );
    return response;
  }

  handlePersonChange(event, data) {
    let { url, children, person } = data;
    this.setState({
      ...this.state,
      selectedPersonId: url,
      selectedPersonObject: person
    });
  }

  render() {
    let {
      res,
      selectedPersonId,
      activePage,
      selectedPersonObject
    } = this.state;
    // console.log("< from index.js: ", activePage);
    let { count, next, previous, results } = res;
    let totalPage = Math.ceil(count / 10);

    return (
      <div>
        <Head>
          <title>Starwars Collection</title>
        </Head>
        <Segment style={{ borderRadius: 0 }}>
          <Header as="h1" content="Welcome, Commander" textAlign="center" />
          <Header
            as="h4"
            content="What do you wish to find out?"
            textAlign="center"
          />
          <Divider />
          <Grid stackable>
            <Grid.Row textAlign="center">
              <Grid.Column textAlign="center">
                <Header as="h2" textAlign="center">
                  Character list ({count})
                </Header>
                <Pagination
                  activePage={activePage}
                  totalPages={totalPage}
                  onPageChange={(event, data) => {
                    this.handlePageChange(event, data);
                  }}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2} stretched>
              <Grid.Column textAlign="center">
                <Container>
                  <Segment textAlign="center">
                    <Header
                      as="h1"
                      content={`Currently page ${
                        this.state.activePage
                      } out of ${totalPage}`}
                    />

                    <List link>
                      {results.map((person, i) => {
                        return (
                          <List.Item
                            key={i}
                            href="#"
                            url={person.url}
                            person={person}
                            onClick={(event, data) => {
                              this.handlePersonChange(event, data);
                            }}
                          >
                            {person.name}
                          </List.Item>
                        );
                      })}
                    </List>
                  </Segment>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Segment textAlign="left" style={{ height: "650" }}>
                    <Person
                      id={selectedPersonId}
                      person={selectedPersonObject}
                    />
                  </Segment>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
