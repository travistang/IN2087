import React from 'react'
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

export default {
  textElement(input,state,getValidationState,updateValue) {
    return (
      <FormGroup
        controlId={input.name}
        validationState={getValidationState(input.name)}>
        <Col className="FormName" componentClass={ControlLabel} sm={2}>
          {input.name}
        </Col>
        <Col sm={10}>
          <FormControl
            type={input.type}
            value={state[input.name]}
            onChange={e => updateValue(e,input.name)}
            placehodler={input.name} />
        </Col>
      </FormGroup>)
  },
  checkboxElement(input,state,updateValue) {
    return (
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox
            value={state[input.name]}
            onChange={e => updateValue(e,input.name)}
          >
            {input.text}
          </Checkbox>
        </Col>
      </FormGroup>
    )
  },
  radioElement(input,state,updateValue) {
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
                onClick={e => updateValue(e,input.name)}
                inline>
              {choice}
              </Radio>
            ))
          }
        </Col>

      </FormGroup>
    )
  },

  dateElement(input,state,updateValue) {
    return (
      <FormGroup>
        <Col className="FormName" componentClass={ControlLabel} sm={2}>
          {input.displayName?input.displayName:input.name}
        </Col>
        <Col sm={10}>
        <DatePicker
          className="CalendarBox"
          maxDate={new Date()}
          onChange={date => updateValue({target:{value:date}},input.name)}
          value={state[input.name]}
        />
        </Col>
      </FormGroup>
    )
  },
  textareaElement(input,state,updateValue,placeholder = "Write something about yourself...") {
    return (
      <FormGroup>
        <Col className="FormName" componentClass={ControlLabel} sm={2}>
          {input.displayName?input.displayName:input.name}
        </Col>
        <Col sm={10}>
          <FormControl
            resizable={false}
            componentClass="textarea"
            placeholder={placeholder}
            value={state[input.name]}
            onChange={text => updateValue(text,input.name)}>
          </FormControl>
        </Col>
      </FormGroup>
    )
  }
}
