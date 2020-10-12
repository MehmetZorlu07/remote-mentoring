import React, { Component } from "react";

import Card from "../Card/Card";

import chemistry from "../../assets/images/chemistry.jpg";
import machineLearning from "../../assets/images/machine-learning.jpg";
import Sports from "../../assets/images/sports.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 0,
          title: "Chemistry",
          imgSrc: chemistry,
          link: "https://en.wikipedia.org/wiki/Chemistry",
          selected: false,
        },
        {
          id: 1,
          title: "Machine Learning",
          imgSrc: machineLearning,
          link: "https://en.wikipedia.org/wiki/Machine_learning",
          selected: false,
        },
        {
          id: 2,
          title: "Sport",
          imgSrc: Sports,
          link: "https://en.wikipedia.org/wiki/Sport",
          selected: false,
        },
      ],
    };
  }

  handleCardClick = (id) => {
    let items = [...this.state.items];

    items[id].selected = items[id].selected ? false : true;

    items.forEach((item) => {
      if (item.id !== id) {
        item.selected = false;
      }
    });

    this.setState({
      items,
    });
  };

  makeItems = (items) => {
    return items.map((item) => {
      return (
        <Card
          item={item}
          click={(e) => this.handleCardClick(item.id, e)}
          key={item.id}
        />
      );
    });
  };

  render() {
    return (
      <Container fluid={true}>
        <Row className="justify-content-around">
          {this.makeItems(this.state.items)}
        </Row>
      </Container>
    );
  }
}

export default Carousel;
