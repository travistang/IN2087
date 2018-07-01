"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table from 'react-bootstrap';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {apiURL} from "../config"



export  default class ItemListRowOffer extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {

        let rowStyle={
            maxHeight:'25px',
            overflow:'scroll',
        };

        return (
            <tr key={this.props.key}>
    <td>{this.props.offer.image}</td>
        <td colspan="2">
            <tr> {this.props.offer.name}</tr>
        <tr style={rowStyle}> {this.props.offer.descriptions}</tr>
        </td>
        </tr>

    );
    }
}