import React from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { browserHistory } from 'react-router'
import Card from '../Card/Card.js'
import {
  Col,
  Row,
  Image,
  Badge,
  Button,
  Grid
} from 'react-bootstrap'
import MeProvider from '../../providers/me'
import './ItemCard.css'
export default class ItemCard extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    console.log(props.offers)
    this.state = {
      isItemOwner: false,
      isClicked: false
    }
    MeProvider.getInstance().getUser().then(user => {
      if(!user) {
        this.setState({isItemOwner: false})
        return
      }
      if(this.props.group) return
      let thing = this.props.want || this.props.offer
      let id = thing.owner
      this.setState({isItemOwner: id == user._id})
    })
  }
  renderWantCard() {
    return (
      <Grid className="ItemCardContent" fluid>
        <Row>
          <Col className="ItemCardCol">
            <Image className="ItemThumbnail" src="https://react-bootstrap.github.io/thumbnail.png" circle />
          </Col>
        </Row>
        <Row className="ItemRowTitle">
          <Col sm={12} className="ItemTitle ItemCardCol">
            <h4> {this.props.want.name || "Untitled"} </h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="ItemCardCol">
            <p> {this.props.want.descriptions || "No Descriptions"} </p>
          </Col>
        </Row>
        <Row>
          {!this.state.isItemOwner && this.renderContactButton()}
        </Row>
      </Grid>
    )
  }
  renderOfferCard() {
    return (
      <Grid className="ItemCardContent" fluid>
        <Row>
          <Col className="ItemCardCol">
            <Image className="ItemThumbnail" src="https://react-bootstrap.github.io/thumbnail.png" circle />
          </Col>
        </Row>
        <Row className="ItemRowTitle">
          <Col sm={12} className="ItemTitle ItemCardCol">
            <h4> {this.props.offer.name || "Untitled"} </h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="ItemCardCol">
            <p> {this.props.offer.descriptions || "No descriptions"} </p>
          </Col>
        </Row>
        <Row>
          {this.renderPrice()}
        </Row>
        <Row>
          {!this.state.isItemOwner && this.renderContactButton()}
        </Row>
      </Grid>
    )
  }
  renderPrice() {
    if(!this.props.offer) return null
    let res = []
    if(this.props.offer.price > 0) {
      res.push(
        <Col sm={12} className="PriceCol">
          $ {this.props.offer.price}
        </Col>
      )
    }
    if(this.props.offer.wants.length > 0){
      res.push(
        <Col sm={12} className="OfferWantCol">
         Wants {this.props.offer.wants[0].name}
        </Col>
      )
    }
    if(!this.props.offer.price && this.props.offer.wants.length == 0) {

      res.push(
        <Col sm={12} className="PriceCol-Free">
          For Free
        </Col>
      )
    }
    return res
  }
  renderContactButton() {
    return (
      <Col sm={12}>
        <Button block>Contact user</Button>
      </Col>
    )
  }
  renderGroupCard() {
    return (
      <Grid className="ItemCardContent GroupCard" fluid>
        <Row className="ItemRowTitle">
          <Col sm={12} className="ItemTitle ItemCardCol">
            <h4> {this.props.group.groupname || "Untitled"} </h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="ItemCardCol">
            <p> {this.props.group.descriptions || "No descriptions"} </p>
          </Col>
        </Row>

      </Grid>
    )
  }
  handleClick() {
    console.log(this.props)
    this.setState({isClicked: true})
    // browserHistory.push(`/group/${this.props.group.groupname}/`)
  }
  redirectComponent() {
    return this.state.isClicked?(<Redirect to={`/group/${this.props.group.groupname}/`} />):null
  }
  render() {
    return (
      <Card onClick={this.handleClick.bind(this)} cardClass={this.props.group?"GroupCard ItemCardMain":"ItemCardMain"}>
        {this.props.want && this.renderWantCard()}
        {this.props.offer && this.renderOfferCard()}
        {this.props.group && this.renderGroupCard()}
        {this.redirectComponent()}
      </Card>
    )
  }
}
