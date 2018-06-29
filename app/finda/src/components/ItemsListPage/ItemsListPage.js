import React from 'react'
import { Redirect } from 'react-router'
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
import Me from '../../providers/me'
import Auth from '../../providers/auth'
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
      hasChanged: this.getQuestions().map(field => ({[field]:false}))
    }
  }

  getFormElement(input) {
    if(input.type == 'checkbox') return FormElements.checkboxElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'select') return FormElements.selectElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'radio') return FormElements.radioElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'date') return FormElements.dateElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'textarea') return FormElements.textareaElement(input,this.state,this.updateValue.bind(this),"Description of the item")
    return FormElements.textElement(input,this.state,this.getValidationState.bind(this),this.updateValue.bind(this))
  }

  getUserWants() {
    return this.props.user.wants
  }
  getUserOffers() {
    return this.props.user.offers
  }
  getNrUserWants() {
    return this.userWants().length
  }
  getNrUserOffers() {
    return this.userOffers().length
  }
  getItemList() {
    return this.props.isForWant?this.getUserWants():this.getUserOffers()
  }

  getInputFieldValue(inputField) {
    return this.state[inputField]
  }
  getFieldToBoolean(field) {
    return (field=="Yes")?true:false
  }
  getPayload(inputFields) {
    let output = {}
    for (let inputFieldNr in inputFields) {
      let inputFieldName = inputFields[inputFieldNr]
      let field = this.getInputFieldValue(inputFieldName)
      if(!Object.keys(this.state).indexOf(field)) {
        // trigger the invalidation of this field
        this.setState(Object.assign({},this.state,{hasChanged: {[inputFields]: true}}))
        return // stop the form from submitting
      }
      output[inputFieldName] = field
    }
    return output
  }



  getFormElement(input) {
    if(input.type == 'checkbox') {
      return FormElements.checkboxElement(input,this.state,this.updateValue.bind(this))
    }
    if(input.type == 'radio') {
      return FormElements.radioElement(input,this.state,this.updateValue.bind(this))
    }
    if(input.type == 'select') {
      return FormElements.selectElement(input,this.state,this.updateValue.bind(this))
    }
    if(input.type == 'date') {
      return FormElements.dateElement(input,this.state,this.updateValue.bind(this))
    }
    if(input.type == 'textarea') {
      return FormElements.textareaElement(input,this.state,this.updateValue.bind(this),"Description of the item")
    }
    return FormElements.textElement(input,this.state,this.getValidationState.bind(this),this.updateValue.bind(this))
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
    let options = []
    if(!!this.props.user) {
      console.log(this.props.user)
      options = this.props.user.wants 
    }
    console.log(options)
    return [
      {
        name: "name",
        type: "text",
      },
      {
        name: "descriptions",
        type: "textarea",
      },
      {
        name: "price",
        type: "text"
      },
      {
        name: "wants",
        type: "select",
        options: options.map(entry => entry.name)
      },
      {
        name: "images",
        type: "file"
      },
      {
        name: "amount",
        type: "text"
      },
      {
        name: "isInfinite",
        choices: ["true", "false"],
        type: "radio"
      }
    ]
  }
  getQuestions() {
    return this.props.isForWant?this.wantQuestions():this.offerQuestions()
  }

  getValidationState(field) {
    if(this.state.hasChanged[field] && (!this.state[field] || this.state[field].length == 0)) {
      return 'error'
    }
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

  //const config = this.props.isForWant?this.wantQuestions():this.offerQuestions()


  async submitForm(e) {
    e.preventDefault()
    let meProvider = Me.getInstance()

    let questions = this.getQuestions()
    let questionNames = questions.map(q => q.name)

    let payload = {}
    payload = this.getPayload(questionNames)

    let result = null
    /*
    if(this.props.isForWant) {
      result = await meProvider.addWants(payload)
    } else {
      result = await meProvider.addOffers(payload)
    }
    console.log(payload)
    */
    result = this.props.isForWant?(await meProvider.addWants(payload)):(await meProvider.addOffers(payload))


    console.log('Name: ' + payload.name)
    console.log('Description: ' + payload.descriptions)
  }


  getMeAddItemFormTitleString(){
    return this.props.isForWant?"Your wants":"Your offers"
  }
  getUserAddItemFormTitleString(){
    return this.props.isForWant?`${this.props.user.username}'s wants`:`${this.props.user.username}'s offers`
  }
  addItemForm() {
    if(!this.props.isMe) {
      return null
    }
    let formTitle = this.props.isMe?this.getMeAddItemFormTitleString():this.getUserAddItemFormTitleString()
    return (
      <Row>
        <Card>
          <h4> {formTitle} </h4>
          <Form horizontal>
            {this.getQuestions().map(this.getFormElement.bind(this))}
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" type="submit" onClick={this.submitForm.bind(this)}>Add Item</Button>
              </Col>
            </FormGroup>
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

  getMePageHeaderString(){
    return this.props.isForWant?"Your wants":"Your offers"
  }
  getUserPageHeaderString(){
    return this.props.isForWant?`${this.props.user.username}'s wants`:`${this.props.user.username}'s offers`
  }
  render() {
    if(!Auth.getInstance().isLoggedIn()) {
      return <Redirect to='/login' />
    }
    if(!this.props.user) {
      return null
    }
    let items = []
    items = this.getItemList()
    return (
      <div id="formDiv">
        <Row>
          <PageHeader>
            {this.props.isMe?this.getMePageHeaderString():this.getUserPageHeaderString()}
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
