import React from 'react'
import Card from '../Card/Card'
import './RegisterLoginForm.css'
import {
  FieldGroup,
  FormGroup,
  Form,
  ControlLabel,
  FormControl,
  Checkbox,
  PageHeader,
  HelpBlock,
  Col,
  Button,
  Radio,
  Alert,
} from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import Auth from '../../providers/auth'

import Toaster from '../../providers/toaster'
import { Redirect } from 'react-router'

export const registerTitle = "Register a new account"
export const loginTitle = "Login"
const commonFields = [{
  name: 'username',
  helptext: 'Username is required',
}]
const registerFieldsConfig = [
  {
    name: "username",
    type: "text",
  },
  {
    name: "password",
    type: 'password'
  },
  {
    name: 'gender',
    type: 'radio',
    choices: ['M','F'],
  },
  {
    name: 'dob',
    displayName: 'Date of Birth',
    type: "date"
  }
]
const loginFieldsConfig = [
  {
    name: "username",
    type: "text",

  },
  {
    name: "password",
    type: 'password',
  },
  {
    name: 'remember',
    type: 'checkbox',
    text: 'Remember me',
  }
]
const registerFields = registerFieldsConfig.map(field => field.name)
const loginFields = loginFieldsConfig.map(field => field.name)

export default class RegisterLoginForm extends React.Component {
  /*
    Expected props:
      onSubmit,
      isRegsiter
  */
  constructor(props) {
    super(props)
    this.config = this.props.isRegister?registerFieldsConfig:loginFieldsConfig
    let fields = this.props.isRegister?registerFields:loginFields
    this.fields = fields
    /*
      State structure:
      {
        formSubmitSuccessful: boolean,
        hasChanged: {
          field1: boolean,
          ...
        },
        field1: <value>,
        ...
      }

    */
    this.state = {
      formSubmitMessage: null,
      hasChanged: fields.map(field => {field: false})
    }
  }
  async submitForm(e) {
    e.preventDefault()
    let fields = this.props.isRegister?registerFields:loginFields
    let payload = {}
    for (let i in fields) {
      let field = fields[i]
      if(!Object.keys(this.state).indexOf(field)) {
        // trigger the invalidation of this field
        this.setState(Object.assign({},this.state,{hasChanged: {[fields]: true}}))
        return // stop the form from submitting
      }
      console.log('payload')
      console.log(payload)
      payload[field] = this.state[field]
    }
    // register / login
    let authProvider = Auth.getInstance()
    let result = null

    // submit form according to registration / login
    if(this.props.isRegister) {
      result = await authProvider.register(payload)
    } else {
      result = await authProvider.login(payload.username,payload.password)
    }

    // check the result
    let message = null
    if(!result) {
      if(this.props.isRegister) {
        message = 'registerFailed'
      } else {
        message = 'loginFailed'
      }
    } else {
      // invoke success callback from parents
      this.props.onSuccess()
      if(this.props.isRegister) {
        message = 'registerSuccess'
      } else {
        message = 'loginSuccess'
      }
    }
    // show a message instead of redirect
    this.setState(Object.assign({},this.state,{
      formSubmitMessage: message
    }))

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
  getValidationState(field) {
    if(this.state.hasChanged[field] && (!this.state[field] || this.state[field].length == 0)) return 'error'
    return null
  }

  textElement(input) {
    return (
      <FormGroup
        controlId={input.name}
        validationState={this.getValidationState(input.name)}>
        <Col className="FormName" componentClass={ControlLabel} sm={2}>
          {input.name}
        </Col>
        <Col sm={10}>
          <FormControl
            type={input.type}
            value={this.state[input.name]}
            onChange={e => this.updateValue(e,input.name)}
            placehodler={input.name} />
        </Col>
      </FormGroup>)
  }
  checkboxElement(input) {
    return (
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox
            value={this.state[input.name]}
            onChange={e => this.updateValue(e,input.name)}
          >
            {input.text}
          </Checkbox>
        </Col>
      </FormGroup>
    )
  }
  radioElement(input) {
    return (
      <FormGroup>
        <Col className="FormName" componentClass={ControlLabel} sm={2}>
          {input.name}
        </Col>
        <Col sm={10}>
          {
            input.choices.map(choice => (
              <Radio
                name={input.name}
                value={choice}
                onClick={e => this.updateValue(e,input.name)}
                inline>
              {choice}
              </Radio>
            ))
          }
        </Col>

      </FormGroup>
    )
  }
  dateElement(input) {
    return (
      <FormGroup>
        <Col className="FormName" componentClass={ControlLabel} sm={2}>
          {input.displayName?input.displayName:input.name}
        </Col>
        <Col sm={10}>
        <DatePicker
          className="CalendarBox"
          maxDate={new Date()}
          onChange={date => this.updateValue({target:{value:date}},input.name)}
          value={this.state[input.name]}
        />
        </Col>
      </FormGroup>
    )
  }
  getFormElement(input) {
    if(input.type == 'checkbox') return this.checkboxElement(input)
    if(input.type == 'radio') return this.radioElement(input)
    if(input.type == 'date') return this.dateElement(input)
    return this.textElement(input)
  }

  formSubmitMessageElement() {
    let message = this.state.formSubmitMessage
    if(message == 'registerSuccess') {
      return (
        <Alert bsStyle="success">
          <h4>Registration Success!</h4>
          <p> Welcome to FindA! Now you can choose to</p>
          <p>
            <Button bsStyle="primary" onClick={() => <Redirect to='/home/offers'/>}> View people's offers </Button>
              or
            <Button onClick={() => <Redirect to='/me'/>}> Go to your profile </Button>
          </p>
        </Alert>
      )
    }
    if(message == 'registerFailed') {
      return (
        <Alert bsStyle="danger">
          <strong> Registration Failed!</strong> Perhaps the username has been registered, or you simply have no Internet connection...
        </Alert>
      )
    }
    if(message == 'loginFailed') {
      return (
        <Alert bsStyle="danger">
          <strong> Login Failed! </strong> You gave an incorrect username or password, or both...
        </Alert>
      )
    }
    
    if(message == 'loginSuccess') {
      return <Redirect to="/me" />
    }

  }

  resetForm() {
    this.setState(Object.assign({},this.state,
      ...this.fields.map(field => {field: null})
    ))
  }

  render() {
    // you dont need another registration / login when you have logged in
    if (Auth.getInstance().isLoggedIn()) return <Redirect to='/me' />
    return (
      <div>
        <PageHeader>
          {this.props.isRegister?registerTitle:loginTitle}
        </PageHeader>
        {
          (this.state.formSubmitMessage)?
          (
            this.formSubmitMessageElement.bind(this)()
          ):null
        }

        <Card className="FormContainer" bsSize="large">
          <Form horizontal>
            {
              this.config.map(this.getFormElement.bind(this))
            }

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" type="submit" onClick={this.submitForm.bind(this)}>{this.props.isRegister?"Register":"Login"}</Button>
              </Col>
            </FormGroup>
          </Form>

        </Card>

      </div>
    )
  }
}
