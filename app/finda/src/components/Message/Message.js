import React from 'react'
import MessageProvider from '../../providers/message'
import BackgroundNotice from '../BackgroundNotice/BackgroundNotice'
import {
  Col,
  Row,
  Image,
  Badge,
  PageHeader,
  Button,
  Tabs,
  Tab,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import {Redirect} from "react-router"
export default class MessageComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      convo: [],
      redirectTo: null,
    }
    // get the message list
    this.messageProvider = MessageProvider.getInstance()
    this.messageProvider.getAllConversations().then(convo => this.setState({convo}))
  }
  getConvoOverview() {
    return (
      [
        <PageHeader>
          Messages
        </PageHeader>,

        <ListGroup>
          {this.state.convo.map(this.convoViewCell.bind(this))}
        </ListGroup>,

        this.state.redirectTo && <Redirect to={`/messages/${this.state.redirectTo}`} />
      ]
    )
  }
  toConvo(partnerId) {
    this.setState(Object.assign({},this.state,{
      redirectTo: partnerId
    }))
  }
  convoViewCell(convo,i) {
    let partner = convo.participants.filter(p => p._id != this.props.user._id)[0]
    let lastMessage = convo.messages.sort((b,a) => a.time - b.time)[0]
    let lastMessageSender = (lastMessage.author == this.props.user._id)?(this.props.user.username):partner.username
    return (
        <ListGroupItem onClick={() => this.toConvo.bind(this)(partner._id)} bsStyle={(i%2)?"primary":"info"} header={partner.username}>
          {lastMessageSender}: {lastMessage.message.substring(0,32)}...
        </ListGroupItem>

    )
  }
  render() {
    if(!this.props.user) return null
    return (this.state.convo.length > 0)?
    (this.getConvoOverview())
    :
    (<BackgroundNotice title="You have no messages" />)
  }
}
