import React from 'react'
import {
  FieldGroup,
  FormGroup,
  Form,
  ControlLabel,
  FormControl,
  Checkbox,
  Well,
  PageHeader,
  HelpBlock,
  Col,
  Button,
} from 'react-bootstrap'

/*
  Expected props:
    onSubmit,
    isRegsiter
*/
export const registerTitle = "Register a new account"
export const loginTitle = "Login"
const commonFields = [{
  name: 'username',
  helptext: 'Username is required',

}]

const registerFields = "username password".split(' ')
const loginFields = "username password".split(' ')

export default class RegisterLoginForm extends React.Component {
  constructor(props) {
    super(props)
    let fields = this.props.isRegister?registerFields:loginFields
    this.state = {
      validationStates: {...fields.map(field => {field: null})}
    }
  }
  render() {
    return (
      <div>
        <PageHeader>
          {this.props.isRegister?registerTitle:loginTitle}
        </PageHeader>
        <Well bsSize="large">
          <Form horizontal>
            <FormGroup controlId="Username">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="Password">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            {this.props.isRegister?null:(
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Checkbox>Remember me</Checkbox>
                </Col>
              </FormGroup>
            )}

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">{this.props.isRegister?"Register":"Login"}</Button>
              </Col>
            </FormGroup>
          </Form>

        </Well>
      </div>
    )
  }
}
