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
    if(!this.props.user.wants){
      return [];
    }
    else{
        return this.props.user.wants
    }

  }
  getUserOffers() {
    if(!this.props.user.wants){
      return [];
    }
    else{
        return this.props.user.offers
    }
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

  questions() {
    return [
      {name: "groupname",type: "text",},
      {name: "descriptions",type: "textarea"}
    ]
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


  async addGroups(payload) {
    let meProvider = Me.getInstance()
    let providerAnswer = null
    if(this.props.isForWant) {
      providerAnswer = (await meProvider.deleteWants(payload))
    }
    else {
      providerAnswer = (await meProvider.deleteOffers(payload))
    }
    return providerAnswer
  }
  

  async submitAddForm(e) {
    e.preventDefault()

    let questions = this.getQuestions()
    let questionNames = questions.map(q => q.name)

    let payload = {}
    payload = this.getPayload(questionNames)

    let result = null
    result = await this.addWantsOffers(payload)


    console.log('Add Item')
    console.log('Name: ' + payload.name)
    console.log('Description: ' + payload.descriptions)
    console.log('Category: ' + payload.category)
    console.log('Image: ' + payload.images)
    if(!this.props.isForWant) {
      console.log('Price: ' + payload.price)
      console.log('Amount: ' + payload.amount)
      console.log('Is Infinite: ' + payload.isInfinite)
    }
  }


  addPageHeader(){
    return(
      <Row>
        <PageHeader>
          Create Group
        </PageHeader>
      </Row> 
    )
  }
  addItemForm() {
    if(!this.props.isMe) {
      return null
    }
    return (
      <Row>
        <Card>
          <h4> 
          Create Group 
          </h4>
          <Form horizontal>
            {this.questions().map(this.getFormElement.bind(this))}
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" type="submit" onClick={this.submitAddForm.bind(this)}>Add Item</Button>
              </Col>
            </FormGroup>
          </Form>
        </Card>
      </Row>
    )
  }
  addItemElement(item) {
    let optionalElements = null
    if(!this.props.isForWant){
      optionalElements = (
        <div>
          Price: {item.price}
          <br />
          Amount: {item.amount}
          <br />
        </div>
      )
    }
    return (
      <Row>
        <Card>
          Name: {item.name}
          <br />
          Description: {item.descriptions}
          <br />
          Category: {item.category}
          <br />
          {optionalElements}
          <Button bsStyle="primary" type="submit" onClick={e => this.submitDeleteForm.bind(this)(e,item)}>Delete Item</Button>
        </Card>
      </Row>
    )
  }
  addNoItemElement() {
    let title = 'There are no groups'
    return <BackgroundNotice title={title} />
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
        {this.addPageHeader()}
        {this.addItemForm()}
        {items.length > 0?(items.map(this.addItemElement.bind(this))):this.addNoItemElement()}
      </div>
    )
  }
}
