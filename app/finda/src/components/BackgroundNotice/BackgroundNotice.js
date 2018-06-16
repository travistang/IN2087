import React from 'react'
import './BackgroundNotice.css'
// a component that shows some descriptive texts for informative purposes
export default class BackgroundNotice extends React.Component {
  constructor(props) {
    super(props)
  }
  titleComponent() {
    if(this.props.title) {
      return (
        <h3 className="BackgroundNoticeTitle">
          {this.props.title}
        </h3>
      )
    }
  }
  textComponent() {
    if(this.props.text) {
      return (
        <h4 className="BackgroundNoticeText">
          {this.props.text}
        </h4>
      )
    }
  }
  render() {
    return (
      <div className="CenterContent BackgroundNoticeMain">
        {this.titleComponent()}
        {this.textComponent()}
      </div>
    )
  }
}
