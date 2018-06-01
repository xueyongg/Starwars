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
  Card
} from "semantic-ui-react";

export const Person = ({ id, person }) => {
  return (
    <div>
      {person.name ? (
        <div>
          <Header as="h1" content={person.name} textAlign="center" />
          <List>
            {Object.keys(person).map((key, i) => {
              let value = person[key.toString()];
              let returnValue;
              if (Array.isArray(value)) {
                returnValue = value.map((v, i) => {
                  return <p>{v}</p>;
                });
              } else {
                returnValue = person[key.toString()];
              }
              return (
                <List.Item key={i}>
                  <b>{key}</b>: {returnValue}
                </List.Item>
              );
            })}
          </List>
        </div>
      ) : (
        <Header as="h1" color="grey" textAlign="center">
          <Responsive minWidth={150} maxWidth={Responsive.onlyMobile.maxWidth}>
            <Icon name="arrow up" />
            <Header.Content>Select a user</Header.Content>
          </Responsive>
          <Responsive
            minWidth={Responsive.onlyTablet.minWidth}
            maxWidth={Responsive.onlyWidescreen.maxWidth}
          >
            <Icon name="arrow left" />
            <Header.Content>Select a user</Header.Content>
          </Responsive>
        </Header>
      )}
    </div>
  );
};
