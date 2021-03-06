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
  Glyphicon,

} from 'react-bootstrap'
import Autosuggest from 'react-autosuggest'
import SearchProvider from '../../providers/search'
/*
  Expect:
    onSearchClear:
    onSearchResult, {searchOption: "Wants/Offers..",result: [...]}
    size: bsSize, optional

*/
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.searchOptions = "Wants Offers Groups".split(' ')

    this.state = {
      searchResult: [],
      searchTerm: '',
      searchOption: this.searchOptions[0],
    }
    this.searchProvider = SearchProvider.getInstance()
  }
  handleAutoSuggestSearchTermChange(e,{newValue}) {
    return this.handleSearchTermChange({target:{value:{newValue}}})

  }
  handleSearchTermChange(e) {
    this.setState(Object.assign({},this.state,{searchTerm:e.target.value}))

    if(this.searchTrigger) clearTimeout(this.searchTrigger)
    if(e.target.value.length == 0) {
      // notify clear state
      // set state is async...
      this.setState({...this.state,searchResult: [],searchTerm: ''},
        () => this.props.onSearchResult(this.state)
      )

      return // do not trigger search
    }
    this.searchTrigger = setTimeout(
        this.search.bind(this)
      ,500)
  }

  async search() {
        let searchFunc = null
        if(this.state.searchTerm.trim().length == 0) {
          alert('search with empty string')
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
          return
        }
        let result= await searchFunc(this.state.searchTerm)
        console.log('searchbar state in state change')
        console.log(this.state)
        this.setState(Object.assign({},this.state,{searchResult: result}),() => this.props.onSearchResult(this.state))
  }
  setSearchOption(o) {
    this.setState(Object.assign({},this.state,{searchOption:o}), () => {this.search()})
  }
  // auto-suggest stuff
  async onSuggestionsFetchRequested({value,reason}) {
    if(value.trim().length > 0
      && "input-focused input-changed".split(' ').some(r => r == reason))
    {
      return await this.search()
    }
    // this.setState({...this.state,searchTerm: value})
  }
  onSuggestionsClearRequested() {
    this.setState({...this.state,searchResult: []})
  }
  getSuggestionValue(suggestion) {
    return suggestion.name // doesnt matter here
  }
  renderSuggestion(suggestion,{query,isHighlighted}) {
    return (
      <div>
        Suggestion: {suggestion.name},query: {query}
      </div>
    )
  }
  render () {
    let inputProps = {
      placeholder: "Search",
      value:this.state.searchTerm,
      onChange:this.handleAutoSuggestSearchTermChange.bind(this)
    }
    return (
      <FormGroup>
        <InputGroup>
          <DropdownButton
            componentClass={InputGroup.Button}
            bsSize={this.props.size || ""}
            bsStyle="success"
            title={this.state.searchOption}
          >
            {this.searchOptions.map((o,i) =>
              <MenuItem onClick={() => this.setSearchOption.bind(this)(o)} eventKey={i}>{o}</MenuItem>
            )}
          </DropdownButton>
          {
            this.props.withSearchSuggestion?(
              // search suggestion stuff goes here
              <Autosuggest
                suggestions={this.state.searchResult}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                inputProps={inputProps}
              >

              </Autosuggest>
            ):(
              <FormControl
                bsSize={this.props.size || ""}
                type="text"
                placeholder="Search"
                value={this.state.searchTerm}
                onChange={this.handleSearchTermChange.bind(this)}
              />
            )
          }
          <div class="input-group-btn">
            <button class="btn btn-default" type="submit">
              <i class="glyphicon glyphicon-search"></i>
            </button>
          </div>
        </InputGroup>
      </FormGroup>
    )
  }
}
