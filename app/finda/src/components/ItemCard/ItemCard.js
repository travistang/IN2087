import React from 'react'
import Card from '../Card/Card.js'
import {
  Col,
  Row,
  Image,
  Badge,
  Button,
  Grid
} from 'react-bootstrap'
import './ItemCard.css'
export default function(props) {
  return (
    <Card cardClass="ItemCardMain">
      <Grid className="ItemCardContent" fluid>
        <Row>
          <Col className="ItemCardCol">
            <Image className="ItemThumbnail" src="https://react-bootstrap.github.io/thumbnail.png" circle />
          </Col>
        </Row>
        <Row className="ItemRowTitle">
          <Col sm={12} className="ItemTitle ItemCardCol">
            <h4> {props.want.title} </h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="ItemCardCol">
            <p> {props.want.descriptions} </p>
          </Col>

        </Row>
      </Grid>
    </Card>
  )
}
