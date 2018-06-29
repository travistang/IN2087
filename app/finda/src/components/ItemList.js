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
            <p>testList</p>
            <ItemListRow/>
        </div>
        )
    }




}