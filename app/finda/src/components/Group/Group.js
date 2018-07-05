import React from 'react'
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
import { Redirect } from 'react-router'
import GroupProvider from '../../providers/group'
import AuthProvider from '../../providers/auth'
import Card from '../Card/Card'
import ItemCard from '../ItemCard/ItemCard'
import BackgroundNotice from '../BackgroundNotice/BackgroundNotice'
import './Group.css'
export default class Group extends React.Component {
  constructor(props) {
    super(props)
    this.groupProvider = GroupProvider.getInstance()
    this.authProvider = AuthProvider.getInstance()
    this.state = {
      info: null,
      isMemberOfGroup: false
    }
    this.loadGroupInfo()
  }
  loadGroupInfo() {
    let groupname = this.props.match.params.groupname
    this.groupProvider.info(groupname).then(groupinfo => {
      this.setState(Object.assign({},this.state,{
        info: groupinfo,
        isMemberOfGroup: this.props.user && groupinfo.members.some(member => member._id == this.props.user._id)
      }))
    })
  }
  componentWillReceiveProps() {
    this.loadGroupInfo()
  }
  editGroupInfo() {
    //TODO: this
  }
  groupInfoComponent() {
    if(!this.state.info) return null
    return (
      <Col className="NameCol" xs={12} md={8} sm={8} lg={8}>
        <Row>
            <h2>{this.state.info.groupname}</h2>
            <Badge>{this.state.info.wants.length} wants</Badge>
            <Badge>{this.state.info.offers.length} offers</Badge>
        </Row>
        <Row>
          {this.state.info.descriptions}
        </Row>
        {this.state.isMemberOfGroup? (
          <Row>
            <Col sm={6}>
              <Row>
                <Button block onClick={this.editGroupInfo.bind(this)}> Edit Group Info</Button>
              </Row>
            </Col>
            <Col sm={6}>
              <Row>
                <Button bsStyle="danger" block onClick={this.quitGroup.bind(this)}> Quit Group</Button>
              </Row>
            </Col>
          </Row>

        ): (
          <Row>
            <Col sm={6}>
              <Row>
                <Button block onClick={this.joinGroup.bind(this)}> joinGroup</Button>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    )
  }
  async quitGroup() {
    let name = this.state.info.groupname
    let result = this.groupProvider.quitGroup(name)
    if(result) window.location.reload()
  }
  async joinGroup() {
    let name = this.state.info.groupname
    let result = this.groupProvider.joinGroup(name)
    if(result) window.location.reload()
  }
  wantsSection() {
    return (
      <div>
        <Row>
          {(this.state.info && this.state.info.wants.length)?
            this.state.info.wants.map(want => <ItemCard className="ItemCard" want={want} />)
            :
            <BackgroundNotice title="This group has no wants" />
          }
        </Row>
        {this.state.isMemberOfGroup && (
          <Row>
            <Col>
              <div>
                <Button block bsSize="large" bsStyle="primary" href="wants"> To {this.state.info.groupname}'s wants</Button>
              </div>

            </Col>
          </Row>
        )}
      </div>
    )
  }
  offersSection() {
    return (
      <div>
        <Row>
          {(this.state.info && this.state.info.offers.length)?
            this.state.info.offers.map(offer => <ItemCard offer={offer} />)
            :
            <BackgroundNotice title="This group has no offers" />
          }
        </Row>
        {this.state.isMemberOfGroup && (
          <Row>
            <Col>
              <div>
                <Button block bsSize="large" bsStyle="primary" href="offers"> To {this.state.info.groupname}'s offers</Button>
              </div>
            </Col>
          </Row>
        )}
      </div>
    )
  }
  memberSection() {
    return (
      <div>
        <Row>
          <div className="MemberSectionContainer">
            {(this.state.info && this.state.info.members.length)?
              this.state.info.members.map(member => <ItemCard user={member} />)
              :
              <BackgroundNotice title="This group has no members" />
            }
          </div>
        </Row>
      </div>
    )
  }
  render () {
    // if(!this.authProvider.isLoggedIn()) return <Redirect to='/login' />
    return (
      <Col>
        <Row>
          <Col sm={2} />
          {this.groupInfoComponent()}
        </Row>
        <div className="SubpageContainer">
          <Tabs>
            <Tab eventKey={1} title="Wants">
              {this.wantsSection()}
            </Tab>
            <Tab eventKey={2} title="Offers">
              {this.offersSection()}
            </Tab>
            <Tab eventKey={3} title="Members">
              {this.memberSection()}
            </Tab>
          </Tabs>
        </div>
      </Col>
    )
  }
}
