"use strict";

import React from 'react';
import {Table} from 'react-bootstrap';
import ItemListRow from './ItemListRow';

export default class ItemList extends React.Component{

    constructor(props){
        super(props);
    }




    render() {

        return (

        <Table hover condensed={false}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th ></th>


                </tr>
            </thead>
            <tbody>
                {this.props.wants.map(function(want){
                                           return <ItemListRow key={want._id} want={want}></ItemListRow>
                                       })}
            </tbody>

        </Table>



        )
    }




}