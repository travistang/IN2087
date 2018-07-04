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
import Card from '../Card/Card'
import ItemCard from '../ItemCard/ItemCard'
import { Redirect } from 'react-router'
import HomeProvider from '../../providers/home'
import SearchProvider from '../../providers/search'
import BackgroundNotice from '../BackgroundNotice/BackgroundNotice'
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
    console.log('search term change')
    console.log(e.target.value)
    console.log(this.state.searchTerm)
    this.setState(Object.assign({},this.state,{searchTerm:e.target.value}))
    if(this.searchTrigger) clearTimeout(this.searchTrigger)

      this.searchTrigger = setTimeout(
        this.search.bind(this)
      ,500)
  }
  async search() {
        let searchFunc = null
        if(this.state.searchTerm.trim().length == 0) {
          this.setState(Object.assign({},this.state,{searchResult: []}))
          return
        }
        if(this.state.searchOption == 'Wants') {
          searchFunc = this.searchProvider.searchWants
        }
        else if(this.state.searchOption == 'Offers') {
          searchFunc = this.searchProvider.searchOffers
        }
        else if(this.state.searchOption == 'Groups') {
          searchFunc = this.searchProvider.searchGroups
        }
        else if(this.state.searchOption == 'Categories') {
          searchFunc = this.searchProvider.searchCategories
        } else {
          // ??
          console.log("gg")
          return
        }
        let result= await searchFunc(this.state.searchTerm)
        this.setState(Object.assign({},this.state,{searchResult: result}))
  }
  setSearchOption(option) {
    this.setState(Object.assign({},this.state,{searchOption: option}))
  }
  getItemCardForResult(result) {
    let props = {}
    if(this.state.searchOption == "Wants") props.want = result
    else if(this.state.searchOption == "Offers") props.offer = result
    else if(this.state.searchOption == "Groups") props.group = result
    else {
      // categories: special treatment
      return (
        <Card>
          {result}
        </Card>
      )
    }
    return <ItemCard {...props} />
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
              <Button
                bsSize="large"
                bsStyle="primary"
                onClick={this.search.bind(this)}
              >
                Search
              </Button>
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
        <Row>
          <Col>
            <PageHeader>
              Searching {this.state.searchOption}: {this.state.searchTerm}
            </PageHeader>
          </Col>
          <Col>
            <div className="SearchResultContainer">
              {this.state.searchResult.length?this.state.searchResult.map(result => this.getItemCardForResult(result)):
              (<BackgroundNotice title="No Results" />)}
            </div>
          </Col>
        </Row>
    )
  }
  render() {
    if(!this.state.content) return null
    return (
      <Col>
        {this.renderSearchBar()}
        {
          (this.state.searchTerm.length > 0)?
          this.getSearchResultItems():
          this.getDefaultItems()
        }
      </Col>
    )
  }
}
