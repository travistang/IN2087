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
    console.log('props')
    console.log(props)
    this.groupProvider = GroupProvider.getInstance()
    this.authProvider = AuthProvider.getInstance()
    this.state = {
      info: null,
      isMemberOfGroup: false
    }
    this.loadGroupInfo()
  }
  loadGroupInfo() {
    console.log('load group info')
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
        {this.state.isMemberOfGroup && (
          <Row>
            <Col sm={6}>
              <Row>
                <Button block onClick={this.editGroupInfo}> Edit Group Info</Button>
              </Row>
            </Col>
          </Row>

        )}
      </Col>
    )
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
                {this.state.isMemberOfGroup?<Button block bsSize="large" bsStyle="primary" href="wants"> To {this.state.info.groupname}'s wants</Button>:null}
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
            this.state.info.offers.map(offer => <ItemCard want={offer} />)
            :
            <BackgroundNotice title="This group has no offers" />
          }
        </Row>
        {this.state.isMemberOfGroup && (
          <Row>
            <Col>
              <div>
                {this.props.isMemberOfGroup?<Button block bsSize="large" bsStyle="primary" href="offers"> To {this.state.info.groupname}'s offers</Button>:null}
              </div>

            </Col>
          </Row>
        )}
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
          </Tabs>
        </div>
      </Col>
    )
  }
}
