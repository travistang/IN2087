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
  Grid,
} from 'react-bootstrap'
import MeProvider from '../../providers/me'
import GroupProvider from '../../providers/group'
import './ItemCard.css'
export default class ItemCard extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      isItemOwner: false,
      isClicked: false,
      isMe: false,
      contactComponent: null,
    }
    MeProvider.getInstance().getUser().then(user => {
      if(!user) {
        this.setState(Object.assign({},this.state,{isItemOwner: false}))
        return
      }
      // update isMe if this is rendering a user
      if(this.props.user && this.props.user._id == user._id) {
        this.setState(Object.assign({},this.state,{isMe: true}))
      }

      if(this.props.group) return
      if(this.props.user) return
      // update isMe according to items if this is rendering wants/offers
      let things = this.props.want?user.wants:user.offers
      let thing = this.props.want || this.props.offer
      let id = thing._id
      this.setState({isItemOwner: things.some(t => t._id == id)})
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
          {!this.props.canDelete && !(this.state.isItemOwner) && this.renderContactButton()}
        </Row>
        {
          this.props.canDelete && (
            <Row>
              <Col sm={12}>
                <Button onClick={this.deleteItem.bind(this)} bsStyle="danger" bsSize="small" block>
                  Delete
                </Button>
              </Col>
            </Row>
          )
        }
      </Grid>
    )
  }
  async deleteItem() {
    if(this.props.groupInfo) {
      let isWant = this.props.want
      let thing = isWant?this.props.want:this.props.offer
      let payload = {[isWant?"wants":"offers"]: thing._id}
      let gp = GroupProvider.getInstance()
      let func = this.props.want?gp.deleteWants:gp.deleteOffers
      let result = await func.bind(gp)(this.props.groupInfo.groupname,payload)
      console.log('delete result')
      console.log(result)
      if(result) window.location.reload()
    }
    if(this.props.want) {
      let payload = {wants: this.props.want._id}
      let result = await MeProvider.getInstance().deleteWants(payload)
      if(result.status == 200) window.location.reload()
    } else if (this.props.offer){
      let payload = {offers: this.props.offer._id}
      let result = await MeProvider.getInstance().deleteOffers(payload)
      if (result.status == 200) window.location.reload()
    }
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
        {
          !this.props.canDelete && !this.state.isItemOwner && (
            <Row>
              {this.renderContactButton()}
            </Row>
          )
        }
        {
          this.props.canDelete && (
            <Row>
              <Col sm={12}>
                <Button onClick={this.deleteItem.bind(this)} bsStyle="danger" bsSize="small" block>
                  Delete
                </Button>
              </Col>
            </Row>
          )
        }
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
    if(this.props.offer.wants && this.props.offer.wants.length > 0){
      res.push(
        <Col sm={12} className="OfferWantCol">
         Wants {this.props.offer.wants[0].name}
        </Col>
      )
    }
    if(!this.props.offer.price && (!this.props.offer.wants || this.props.offer.wants.length == 0)) {

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
      <Col>
        <Button bsSize="small" block onClick={this.contactUser.bind(this)}>Contact User</Button>
      </Col>
    )
  }
  contactUser() {
    console.log('im contacting user')

    if(this.props.user) {
      this.setState(Object.assign({},this.state,{
        contactComponent: <Redirect to={`/messages/${this.props.user._id}`} />
      }))
      return
    }
    // for contacting creators of wants / offers
    let thing = this.props.want || this.props.offer
    let userId = thing.creator
    if(!userId) return
    // TODO: give a chat !
    this.setState(Object.assign({},this.state,{
      contactComponent: <Redirect to={`/messages/${userId}`} />
    }))

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
    if(!this.state.isClicked) return
    if(this.props.group) return <Redirect to={`/group/${this.props.group.groupname}/`} />
    if(this.props.user) {
      let url = this.state.isMe?`/me`:`/user/${this.props.user.username}`
      return <Redirect to={url} />
    }

  }
  // <Grid className="ItemCardContent UserCard" fluid>
  //   <Row>
  //     <div className="UserThumbnailContainer">
  //       <img className="UserThumbnail" src="http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/512/user-alt.png" />
  //     </div>
  //   </Row>
  //   <Row className="UsernameRow">
  //     <h4>{this.props.user.username}</h4>
  //   </Row>
  //   <Row>
  //     {!this.state.isMe && this.renderContactButton()}
  //   </Row>
  // </Grid>
  renderUserCard() {
    return (
      <div className="UserCardContent">
        <div className="UserThumbnailContainer">
          <img className="UserThumbnail" src="http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/512/user-alt.png"/>
        </div>
        <div className="UserDetailColumn">
          <div className="UserInfoRow">
            {this.props.user.username}
          </div>
          <div className="UserDescriptionRow">
            {this.props.user.descriptions}
          </div>
          <div className="UserContactRow">
            <i class="glyphicon glyphicon-search" /> Contact User
          </div>
        </div>
      </div>
    )
  }
  getCardClass() {
    if(this.props.group) return "GroupCard ItemCardMain"
    if(this.props.user) return "UserCard"
    return "ItemCardMain"
  }
  render() {
    return (
      <Card onClick={this.handleClick.bind(this)} cardClass={this.getCardClass()}>
        {this.props.want && this.renderWantCard()}
        {this.props.offer && this.renderOfferCard()}
        {this.props.group && this.renderGroupCard()}
        {this.props.user && this.renderUserCard()}
        {this.redirectComponent()}
        {this.state.contactComponent}
      </Card>
    )
  }
}
