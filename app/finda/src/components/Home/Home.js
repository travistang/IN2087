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
import SearchBar from '../SearchBar/SearchBar'
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
      searchOption: "Wants",
      searchTerm: '',
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
          <div className="HomeItemContainer">
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
          <div className="HomeItemContainer">
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
          <div className="HomeItemContainer">
            {this.state.content.groups.map(want => <ItemCard className="HomeItem" group={want} />)}
          </div>

        </Col>

      </Row>
    )
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
        <SearchBar
          onSearchResult={this.onSearchResult.bind(this)}
        />
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
  onSearchResult(result) {
    this.setState({...this.state,...result})
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
              {(this.state.searchResult.length)?this.state.searchResult.map(result => this.getItemCardForResult(result)):
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
