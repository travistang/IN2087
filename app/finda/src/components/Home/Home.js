import React from 'react'
import {
  Col,
  Row,
  Image,
  Badge,
  PageHeader,
  Button,
  Tabs,
  Tab,
  Form,
  FormGroup,
  InputGroup,
  FormControl,
  DropdownButton,
  ButtonToolbar,
  MenuItem,

} from 'react-bootstrap'
import ItemCard from '../ItemCard/ItemCard'
import { Redirect } from 'react-router'
import HomeProvider from '../../providers/home'
import SearchProvider from '../../providers/search'
import './Home.css'
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.homeProvider = HomeProvider.getInstance()
    this.searchProvider = SearchProvider.getInstance()
    this.state = {
      searchResult: [],
      searchTerm: '',
      searchOption: "Wants",
      content: null
    }
    this.homeProvider.gethomeContent().then(content => {
      this.setState(Object.assign({},this.state,{content}))

    })

    this.searchTrigger = null
  }
  renderWants() {
    return (
      <Row>
        <Col>
          <PageHeader>
            Wants
          </PageHeader>
        </Col>
        <Col>
          <div className="ItemContainer">
            {this.state.content.wants.map(want => <ItemCard className="HomeItem" want={want} />)}
          </div>

        </Col>

      </Row>
    )
  }
  renderOffers() {
    return (
      <Row>
        <Col>
          <PageHeader>
            Offers
          </PageHeader>
        </Col>
        <Col>
          <div className="ItemContainer">
            {this.state.content.offers.map(want => <ItemCard className="HomeItem" offer={want} />)}
          </div>

        </Col>

      </Row>
    )
  }
  renderGroups() {
    return (
      <Row>
        <Col>
          <PageHeader>
            Groups
          </PageHeader>
        </Col>
        <Col>
          <div className="ItemContainer">
            {this.state.content.groups.map(want => <ItemCard className="HomeItem" group={want} />)}
          </div>

        </Col>

      </Row>
    )
  }
  handleSearchTermChange(e) {
    this.setState(Object.assign({},this.state,{searchTerm:e.target.value}))
    if(this.searchTrigger) clearTimeout(this.searchTrigger)
    if(this.state.searchTerm.trim().length > 0)
    {
      this.searchTrigger = setTimeout(async () => {
          let result= await this.searchProvider.searchWants(this.state.searchTerm)
          this.setState(Object.assign({},this.state,{searchResult: result}))

      },500)
    } else {
      // nothing, restore the original object
      this.setState(Object.assign({},this.state,{searchResult: []}))
    }
  }
  setSearchOption(option) {
    console.log('setting search option')
    console.log(option)
    this.setState(Object.assign({},this.state,{searchOption: option}))
  }
  renderSearchBar() {
    return (
      <Row>
        <Col sm={12} md={12} lg={12} className="SearchBarCol">
          <Form inline horizontal className="SearchForm">
            <FormGroup className="SearchForm">
                <DropdownButton
                  bsSize="large"
                  title={this.state.searchOption}

                >
                  {"Wants Offers Groups Categories".split(' ').map(
                    (title,i) => <MenuItem onClick={() => this.setSearchOption.bind(this)(title)} eventKey={i}>{title}</MenuItem>)}
                </DropdownButton>
              <FormControl
                bsSize="large"
                type="text"
                placeholder="Search"
                value={this.state.searchTerm}
                onChange={this.handleSearchTermChange.bind(this)}
              />
            </FormGroup>

          </Form>

        </Col>
      </Row>

    )
  }
  getDefaultItems() {
    return [
      this.renderWants(),
      this.renderOffers(),
      this.renderGroups()
    ]

  }

  getSearchResultItems() {
    return (
        <div>Here comes the search result</div>
    )
  }
  render() {
    if(!this.state.content) return null
    return (
      <Col>
        {this.renderSearchBar()}
        {
          (this.state.searchResult.length > 0)?
          this.getSearchResultItems():
          this.getDefaultItems()
        }
      </Col>
    )
  }
}
