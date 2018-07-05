import React from 'react'
import {
  Col,
  Row,
  Image,
  Badge,
  Button,
  Grid,
  Form,
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap'
import MessageProvider from '../../providers/message'
import SearchProvider from '../../providers/search'
import './Conversation.css'
export default class ConversationPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      convo: null,
      partner: null,
      composedMessage: ''
    }
    let partnerId = this.props.match.params.userId
    this.partnerId = partnerId // for convenience
    this.messageProvider = MessageProvider.getInstance()

    SearchProvider.getInstance().getUserById(partnerId).then(partner => {
      this.setState(Object.assign({},this.state,{partner}))
    })

    // periodically fetch messages
    setInterval(() => {
      this.messageProvider.getConversation(partnerId)
        .then(convo => this.setState(Object.assign({},this.states,{convo})))

    },3000)

    document.addEventListener('keydown', (e) => {
      if(e.keyCode == 13) {
        this.sendMessage()
      }
    })
  }
  async sendMessage() {
    if(!this.state.composedMessage || this.state.composedMessage.trim().length == 0) return
    let result = await this.messageProvider.addMessage(this.partnerId,this.state.composedMessage)
    this.setState(Object.assign({},this.state,{composedMessage: ""}))

  }
  getLastMessageTime() {
    if(!this.state.convo || !this.state.convo.messages) return null
    return this.state.convo.messages
      .map(m => m.time)
      .sort((b,a) => a - b)[0]
  }
  renderConvoHeader() {
    if(!this.state.partner) return null
    return (
      <Row className="ConvoHeaderRow">
        <Col sm={2} className="UserThumbnailContainer">
          <div className="UserThumbnailContainer">
            <img className="UserThumbnail" src="http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/512/user-alt.png" />
          </div>
        </Col>

        <Col sm={10}>
          <h3> {this.state.partner.username} </h3>
          <p> {this.getLastMessageTime() || "You have no messages"} </p>
        </Col>
      </Row>
    )
  }
  messageBox(msg) {
    let isMyMsg = msg.author == this.props.user._id
    return (
      <div className={isMyMsg?"MyMessageRow":"TheirMessageRow"}>
        <div className={isMyMsg?"MyMessageBox":"TheirMessageBox"}>
          <div>
            <h4> {msg.message} </h4>
            <p> {msg.time.substring(0,19)} </p>
          </div>
        </div>
      </div>
    )
  }
  getMessagesComponents() {
    if(!this.state.convo || !this.state.convo.messages) return null
    let msgs = this.state.convo.messages.sort((a,b) => a.time - b.time)
    return msgs.map(msg => this.messageBox(msg))

  }
  onCompose(e) {
    this.setState(Object.assign({},this.state,{composedMessage: e.target.value}))
  }
  getComposeMessageComponents() {
    return (
      <div className="ComposeMessageContainer">
        <Form inline>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="textarea"
                value={this.state.composedMessage}
                onChange={this.onCompose.bind(this)}
              />
              <Button
                onClick={this.sendMessage.bind(this)}
              >
                Send
              </Button>
            </InputGroup>
          </FormGroup>

        </Form>
      </div>
    )
  }
  render() {
    return (
      <Col>
        {this.renderConvoHeader()}
        {this.getMessagesComponents()}
        {this.getComposeMessageComponents()}
      </Col>
    )
  }
}
