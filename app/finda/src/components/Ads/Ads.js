import React, { Component } from 'react';
import {Col} from 'react-bootstrap'

export default function(props) {
  return (
    <Col xsHidden smHidden md={3} lg={3}>
      <div style={{height:"100vh",background: "gray"}}>
      </div>
    </Col>

  )
}
