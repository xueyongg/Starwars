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
import Link from "next/link";

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
                  if (v.includes("http"))
                    // Return a link with <a> tag
                    return (
                      <Link href={v} passHref key={i} target={"_blank"}>
                        <List.Item>{v}</List.Item>
                      </Link>
                    );
                  else return <List.Item>{v}</List.Item>;
                });
                returnValue = <List.List>{returnValue}</List.List>;
              } else {
                if (value.includes("http"))
                  returnValue = (
                    <Link href={value} passHref>
                      <a>{value}</a>
                    </Link>
                  );
                else returnValue = value;
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
