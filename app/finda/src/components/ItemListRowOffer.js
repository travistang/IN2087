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
        let style={
            height:'85px',
            width:'85px',

        }


        return (
            <tr key={this.props.key}>
                <td> <div style={style}><img style={style} src={this.props.offer.images}/> </div></td>

                <td >
                    <tr> {this.props.offer.name}</tr>
                    <div style={rowStyle}>
                    <tr> {this.props.offer.descriptions}</tr>
                    </div>

                </td>
                <td>
                    <tr>Price:</tr>
                    <div style={rowStyle}>
                        <tr> {this.props.offer.price}</tr>
                    </div>
                </td>

            </tr>

    );
    }
}
