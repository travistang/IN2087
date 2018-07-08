import React from 'react'
import {
  Alert,
  Col,
  Row,
  Image,
  Badge,
  PageHeader,
  Button,
  Form,
  FormGroup,
  Breadcrumb,
} from 'react-bootstrap'
import ItemCard from '../ItemCard/ItemCard'
import BackgroundNotice from '../BackgroundNotice/BackgroundNotice'
import Card from '../Card/Card'
import FormElements from '../../utils/form'
import Me from '../../providers/me'
import GroupProvider from '../../providers/group'
import './ItemsListPage.css'
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
      errorMessage: null,
      info : null,
      hasChanged: this.questions().map(field => ({[field]:false}))
    }

    // populate categories
    if(this.props.isGroup) {
      let groupname = this.props.match.params.groupname
      GroupProvider.getInstance().info(groupname).then(info => {
        this.setState(Object.assign({},this.state,{info}))
      })

    }
  }
  isMemberOfGroup() {
    if(!this.state.info || ! this.props.user) return false
    return this.state.info.members
      .map(m => m._id)
      .some(id => id == this.props.user._id)
  }
  getFormElement(input) {
    if(input.type == 'checkbox') return FormElements.checkboxElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'radio') return FormElements.radioElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'date') return FormElements.dateElement(input,this.state,this.updateValue.bind(this))
    if(input.type == 'textarea') return FormElements.textareaElement(input,this.state,this.updateValue.bind(this),"Description of the item")
    if(input.type == 'choices') return FormElements.choicesElement(input,this.state,this.updateValue.bind(this))
    return FormElements.textElement(input,this.state,this.getValidationState.bind(this),this.updateValue.bind(this))
  }
  questions() {
    if(this.props.isForGroup)
      return this.groupQuestions()
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
  groupQuestions() {
    return [
      {
        name: "groupname",
        type: "text",
      },
      {
        name: "descriptions",
        type: "textarea"
      }
    ]
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
        type: "textarea",
      },
      {
        name: "amount",
        type: "number",
      },
      {
        name: "price",
        type: "number",
      },
      // {
      //   name: "wants",
      //   type: "choices",
      //   choices: (this.props.user)?this.props.user.wants.map(want => want.name):[],
      // },
      {
        name: "categories",
        type: 'text'
      }
    ]
  }

  async submitForm(e) {
    e.preventDefault()
    // first, reset the message
    this.setState(Object.assign({},this.state,{errorMessage: null}))
    let config = null
    if(this.props.isForGroup) {
      config = this.groupQuestions()
    }else {
      config = this.props.isForWant?this.wantQuestions():this.offerQuestions()
    }
    let questionNames = config.map(q => q.name)

    let payload = {}
    for (let i in questionNames) {
      let field = questionNames[i]
      if(!Object.keys(this.state).indexOf(field)) {
        // trigger the invalidation of this field
        this.setState(Object.assign({},this.state,{hasChanged: {[questionNames]: true}}))
        return // stop the form from submitting
      }
      payload[field] = this.state[field]
    }

    if(this.props.isGroup) {
      // group thing
      let groupProvider = GroupProvider.getInstance()
      let result = null
      if(this.props.isForWant)
        result = await groupProvider.addWants(this.state.info.groupname,payload)
      else
        result = await groupProvider.addOffers(this.state.info.groupname,payload)

      if(result) {
        // refresh?!
        window.location.reload()
      } else {
        let msg = result
        this.setState(Object.assign({},this.state,{errorMessage: msg.error || msg.message || "An error has occured"}))
      }
      return
    }
    let meProvider = Me.getInstance()
    let result = null

    if(this.props.isForGroup) {
      result = await meProvider.createGroup(payload)
    }
    else if(this.props.isForWant) {
      result = await meProvider.addWants(payload)
    } else {
      result = await meProvider.addOffers(payload)
    }
    if(result.status == 200) {
      // refresh?!
      window.location.reload()
    } else {
      let msg = await result.json()
      this.setState(Object.assign({},this.state,{errorMessage: msg.error || msg.message || "An error has occured"}))
    }
  }


  addItemForm() {
    if(!this.props.isMe && !this.isMemberOfGroup()) return null
    let formTitle = ""
    if(this.props.isForGroup) {
      formTitle = "Add a new group"
    }
    else if(this.props.isForWant) {
      formTitle = "Add a new want"
    } else {
      formTitle = "Add a new offer"
    }
    return (
      <Row>
        <Card>
          <h4> {formTitle} </h4>
          <Form horizontal>
            {this.questions().map(this.getFormElement.bind(this))}
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
    if(this.props.isForGroup)
      return <ItemCard group={item} />
    else if(this.props.isForWant) {
      return <ItemCard want={item} groupInfo={this.state.info} canDelete={this.props.isMe|| (this.isMemberOfGroup())}/>
    }
    else {
      return <ItemCard offer={item} groupInfo={this.state.info} canDelete={this.props.isMe|| (this.isMemberOfGroup())}/>
    }
  }
  renderList() {
    let items = null

    if(!this.props.user) return this.noItemElement()

    else if(this.props.isGroup && this.props.isForWant) items = this.state.info && this.state.info.wants
    else if(this.props.isGroup && !this.props.isForWant) items = this.state.info && this.state.info.offers

    else if(this.props.user && this.props.isForGroup) items = this.props.user.groups
    else if(this.props.user && this.props.isForWant) items = this.props.user.wants
    else if(this.props.user && !this.props.isForWant) items = this.props.user.offers
    if(!items) return this.noItemElement()
    return (items.length > 0)?
      (items.map(this.itemElement.bind(this))):(this.noItemElement())
  }
  noItemElement() {
    if(this.props.isGroup) {
      let title = `${this.state.info && this.state.info.groupname} has no ${this.props.isForWant?"wants":"offers"}`
      return <div className="NoItemElement"><BackgroundNotice title={title} /></div>
    }
    let username = this.props.isMe?'You have':`${this.props.username} has`
    let item = "wants"
    if(!this.props.isForWant) item = "offers"
    if(this.props.isForGroup) item = "groups"
    let title = `${username} no ${item}`
    return <div className="NoItemElement"><BackgroundNotice title={title} /></div>
  }
  getPageTitle() {
    if(this.props.isMe) {
      if(this.props.isForWant && !this.props.isForGroup)
        return "Your Wants"
      if (!this.props.isForWant && !this.props.isForGroup)
        return "Your Offers"
      if(this.props.isForGroup)
        return "Your Groups"
    } else if(this.props.isGroup) {
      if(this.props.isForWant) return `${this.state.info && this.state.info.groupname}'s Wants`
      else return `${this.state.info && this.state.info.groupname}'s Offers`
    }
  }
  getBreadCrumb() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/me">
            {this.props.user.username || ""}
          </Breadcrumb.Item>
        <Breadcrumb.Item active>{this.getPageTitle()}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
  render() {
    let items = []
    if(this.props.isGroup && this.props.isForWant) items = this.state.info && this.state.info.wants
    else if(this.props.isGroup && !this.props.isForWant) items = this.state.info && this.state.info.offers
    else if(this.props.user && this.props.isForWant) items = this.props.user.wants
    else if(this.props.user && !this.props.isForWant) items = this.props.user.offers
    else return null
    return (
      <div>
        <Row>
          {this.getBreadCrumb()}
        </Row>
        <Row>
          <PageHeader>
            {this.getPageTitle()}
          </PageHeader>

        </Row>
        {this.state.errorMessage && (
          <Row>
            <Alert bsStyle="danger">
              {this.state.errorMessage}
            </Alert>
          </Row>
        )}
        {this.addItemForm()}
        <div className="ItemContainer">
          {this.renderList()}
        </div>

      </div>
    )
  }
}
