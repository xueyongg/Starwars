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
  Pagination,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { isNull } from "util";
const axios = require("axios");

export default class Index extends Component {
  static async getInitialProps({ res }) {
    const url = "https://swapi.co/api/people"; // Get total number of people in starwars
    let response = await axios({ method: "GET", url }).catch(e =>
      console.log(e)
    );
    return { res: response ? response.data : null };
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
      activePage: 1,
      loading: false
    };
    this.setState(currentState);
  }

  handlePageChange(event, data) {
    let { activePage } = data;
    // console.log("< from index.js activePage: ", activePage);
    let newUrl = "https://swapi.co/api/people/?page=" + activePage;
    let response = this.fetchNewData(newUrl, activePage);
    Promise.resolve(response).then(results => {
      this.setState({
        ...this.state,
        res: results.data,
        loading: false
      });
    });
  }

  async fetchNewData(url, activePage) {
    this.setState({ loading: true, activePage });
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
      selectedPersonObject,
      loading
    } = this.state;
    let { count, next, previous, results } = res || {};
    let errorOccured = isNull(res);
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
            content={
              errorOccured
                ? "Help me. I've encountered an error."
                : "What do you wish to find out?"
            }
            textAlign="center"
          />
          <Divider />

          {errorOccured ? (
            <div>
              <Grid>
                <Container style={{ width: "100%" }}>
                  <Dimmer.Dimmable as={Segment} dimmed style={{ height: 300 }}>
                    <Dimmer active>
                      <Header as="h2" icon inverted>
                        <Icon name="exclamation circle" />
                        An error occured
                        <Header.Subheader>
                          Unable to load from swapi.co
                        </Header.Subheader>
                      </Header>
                    </Dimmer>
                  </Dimmer.Dimmable>
                </Container>
              </Grid>
            </div>
          ) : (
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
                      {loading ? (
                        <Segment style={{ padding: "1em 0em 0em 0em" }}>
                          <Header as="h2" content="Loading" />
                          <Dimmer active inverted>
                            <Loader size="small" />
                          </Dimmer>
                        </Segment>
                      ) : (
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
                      )}
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
          )}
        </Segment>
      </div>
    );
  }
}
