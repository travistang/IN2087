"use strict";

import React from 'react';
//import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react';

import  ItemListRow  from './ItemListRow';


export default class ItemList extends React.Component{

    constructor(props){
        super(props);
    }



    render() {

        return (
            <div>
            <p>{this.props.test}</p>
            <p> {this.props.query}</p>
        {console.log("this.props.want")}
        {console.log(this.props.wants)}
            <div>
            {this.props.wants.map(function(want){
                console.log(want.id);
                return <li key={want._id}>{want.title}</li>
            })}
            </div>

        </div>
        )
    }




}