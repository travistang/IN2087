"use strict";

import React from 'react';
import {Table} from 'react-bootstrap';
import ItemListRow from './ItemListRow';
import ItemListRowOffer from './ItemListRowOffer';

export default class ItemList extends React.Component{

    constructor(props){
        super(props);
    }



    body()
    {
       if(this.props.isOffers){
                         this.props.wants.map(function(offer){
                            return <ItemListRowOffer key={offer._id} offer={offer}></ItemListRowOffer>
                          })
                        }
                        else{
                        this.props.wants.map(function(want){
                            return <ItemListRow key={want._id} want={want}></ItemListRow>
                        })
       }
    }



    render() {

        return (
        <div>
        <p>{"isOffers: " +this.props.isOffers}</p>

        <Table hover condensed={false}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th ></th>


                </tr>
            </thead>
            <tbody>
                {this.body}
                </tbody>

        </Table>
        </div>



        )
    }




}