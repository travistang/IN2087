"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react';

import { ItemListRow } from './ItemListRow';


export default class ItemList extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            //data:Array.from(props)
        }
    }

    propTypes:{
    data:React.PropTypes.array.isRequired
    }
        // this.questions = props.isForWant?this.wantQuestions:this.offerQuestions
       // this.state = {
           // hasChanged: this.questions().map(field => ({[field]:false}))
        //}


    render(){
        let x=this.props.data.length>0
       return( <DataTable plain>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>

                {this.props.data.map((want, i) => <ItemListRow key={i} want={want}></ItemListRow> )
                }
            </TableBody>
            </DataTable>)
    }
}