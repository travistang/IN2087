"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {apiURL} from "../config"



export  default class ItemListRowOffer extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        let rowStyle={
            height:'75px',
            overflowY:'auto',
        };


        return (
            <tr key={this.props.key}>
                <td>{this.props.offer.image}</td>

                <td >
                    <tr> {this.props.offer.name}</tr>
                    <div style={rowStyle}>
                    <tr> {this.props.offer.descriptions}</tr>
                    </div>
                </td>

            </tr>

    );
    }
}
