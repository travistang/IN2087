import React from 'react'
import {
  Col,
  Row,
  Image,
  Badge,
  PageHeader,
  Button,
  Form,
  FormGroup,
} from 'react-bootstrap'
import ItemCard from '../ItemCard/ItemCard'
import BackgroundNotice from '../BackgroundNotice/BackgroundNotice'
import Card from '../Card/Card'
import FormElements from '../../utils/form'
export default class ItemListPage extends React.Component {
  /*
    Expected props are as follows...
    -  isForWant: true/false,
    -  isMe: true / false,
    -  user: user object
  */
  constructor(props) {
    super(props)
    // this.questions = props.isForWant?this.wantQuestions:this.offerQuestions
    this.state = {
      hasChanged: this.questions().map(field => ({[field]:false}))
    }
  }
  getFormElement(input) {
    if(input.type == 'checkbox') return FormElements.checkboxElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'radio') return FormElements.radioElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'date') return FormElements.dateElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'textarea') return FormElements.textareaElement(input,this.state,this.updateValue.bind(this),"Description of the item")
    return FormElements.textElement(input,this.state,this.getValidationState.bind(this),this.updateValue.bind(this))
  }
  questions() {
    if(this.props.isForWant)
      return this.wantQuestions()
    return this.offerQuestions()
  }
  getValidationState(field) {
    if(this.state.hasChanged[field] && (!this.state[field] || this.state[field].length == 0)) return 'error'
    return null
  }
  updateValue(e,field) {
    this.setState(
      Object.assign({},this.state,{

        [field]: e.target.value,
        hasChanged: {
          [field]:true
        }
      })
    )
  }
  wantQuestions() {
    return [
      {
        name: "name",
        type: "text",
      },
      {
        name: "descriptions",
        type: "textarea"
      },

    ]
  }
  offerQuestions() {
    return [
      {
        name: "name",
        type: "text",
      },
      {
        name: "descriptions",
        type: "textarea"
      },

    ]
  }
  addItemForm() {
    if(!this.props.isMe) return null
    let formTitle = this.props.isForWant?"Add a new want":"Add a new offer"
    return (
      <Row>
        <Card>
          <h4> {formTitle} </h4>
          <Form horizontal>
            {this.questions().map(this.getFormElement.bind(this))}
          </Form>
        </Card>
      </Row>
    )
  }
  itemElement(item) {
    return (
      <Row>
        <Card>
          {item.name}
        </Card>
      </Row>
    )
  }
  noItemElement() {
    let username = this.props.isMe?'You have':`${this.props.username} has`
    let wantOrOffer = this.props.isForWant?'wants':'offers'
    let title = `${username} no ${wantOrOffer}`
    return <BackgroundNotice title={title} />
  }
  render() {
    let items = []
    if(this.props.user && this.props.isForWant) items = this.props.user.wants
    if(this.props.user && !this.props.isForWant) items = this.props.user.offers
    return (
      <div>
        <Row>
          <PageHeader>
            {this.props.isMe?"Your wants":`${this.props.user.username}'s wants`}
          </PageHeader>

        </Row>
        {this.addItemForm()}
        {items.length > 0?
          (items.map(this.itemElement)):
          this.noItemElement()
        }
      </div>
    )
  }
}