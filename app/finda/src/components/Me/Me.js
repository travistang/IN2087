import React from 'react'
import {Redirect} from 'react-router'
import {
  Col,
  Row,
  Image,
  Badge,
} from 'react-bootstrap'
import Card from '../Card/Card'

import './Me.css'
export default class Me extends React.Component {
  constructor(props) {
    super(props)
  }
  userName() {
    if(this.props.user) return this.props.user.username
    return ''
  }
  userDescriptions() {
    if(this.props.user && this.props.user.descriptions) {
      return <p>{this.props.user.descriptions}</p>
    } else {
      return <p className="NoDescription"> This user has no descriptions yet </p>
    }
  }
  numUserWants() {
    if(this.props.user && this.props.user.wants) {
      return this.props.user.wants.length
    }
  }
  numUserOffers() {
    if(this.props.user && this.props.user.offers) {
      return this.props.user.offers.length
    }
  }
  render() {

    // if(!this.props.user) return <Redirect to='/login' />
    return (
      <Col>
        <Row>
          <Col className="ThumbnailCol" xs={12} md={4} sm={4} lg={4}>
            <Image className="BigThumbnail" src="https://react-bootstrap.github.io/thumbnail.png" circle />
          </Col>
          <Col className="NameCol" xs={12} md={8} sm={8} lg={8}>
            <Row>
              <h2>{this.userName()}</h2>
              <Badge>{this.numUserWants()} wants</Badge>
              <Badge>{this.numUserOffers()} offers</Badge>
            </Row>
            <Row>
              {this.userDescriptions()}
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}
