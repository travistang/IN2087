import './Card.css'
import React from 'react'
export default function(props) {
  return (
    <div className={`Card ${props.cardClass}`}>
      {props.headerTitle?(
        <div className={`CardHeader ${props.cardTitleClass}`}>
          {props.headerTitle}
        </div>):null}
      {props.children}
    </div>
  )
}
