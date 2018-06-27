import React from 'react'
import {Redirect} from 'react-router'
import {
  Col,
  Row,
  Image,
  Badge,
  PageHeader,
  Button,
  Tabs,
  Tab
} from 'react-bootstrap'
import Auth from '../../providers/auth'
import Card from '../Card/Card'
import ItemCard from '../ItemCard/ItemCard'
import BackgroundNotice from '../BackgroundNotice/BackgroundNotice'
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

  userWants() {
    return this.props.user.wants
  }
  userOffers() {
    return this.props.user.offers
  }
    numUserWants() {
        return this.userWants().length
    }
    numUserOffers() {
        return this.userOffers().length
    }
  editProfileButton() {
    if(this.props.isMe) {
      return (
        <Row>
          <Button block>Edit Profile</Button>
        </Row>
      )
    }
  }
  wantsSection() {
    return (
      <div>
        <Row>
          <Col>
            {(this.userWants().length > 0)?(<div className="ItemContainer">
                {this.userWants().map(want => (
                    <ItemCard want={want} />
                ))}
              </div>):(
                <BackgroundNotice title="This user has no wants" />
              )
            }
          </Col>

        </Row>
        <Row>
          <Col>
            <div>
              {this.props.isMe?<Button block bsSize="large" bsStyle="primary" href="/me/wants"> To my wants</Button>:null}
            </div>

          </Col>
        </Row>
      </div>

    )
  }
  toPremiumButton() {
    if(!this.props.user.isPremium) return (
      <Button bsStyle="success"> To Premium </Button>
    )
  }
  offersSection() {
    return (
      <div>
        <Row>
          <Col>
            {(this.userOffers().length > 0)?(<div className="ItemContainer">
                {this.userOffers().map(want => (
                    <ItemCard want={want} />
                ))}
              </div>):(
                <BackgroundNotice title={`This user has no offers`} />
              )
            }
          </Col>

        </Row>
        <Row>
          <Col>
            <div>
              {this.props.isMe?<Button block bsSize="large" bsStyle="primary" href="/me/offers"> To my offers</Button>:null}
            </div>

          </Col>
        </Row>
      </div>
    )
  }
  groupsSection() {
    return (
      <BackgroundNotice title="You have no groups" />
    )
  }
  render() {

    if(!Auth.getInstance().isLoggedIn()) return <Redirect to='/login' />
    // logged in but user not loaded
    else if(!this.props.user) return null
    else return (
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
            <Row>
              <Col sm={6}>
                {this.editProfileButton()}
              </Col>
              <Col sm={6}>
                {this.toPremiumButton()}
              </Col>
            </Row>

          </Col>
        </Row>






        <div className="SubpageContainer">
          <Tabs>
            <Tab eventKey={1} title="Wants">
              {this.wantsSection()}
            </Tab>
            <Tab eventKey={2} title="Offers">
              {this.offersSection()}
            </Tab>
            <Tab eventKey={3} title="Groups">
              {this.groupsSection()}
            </Tab>
          </Tabs>
        </div>

      </Col>
    )
  }
}
