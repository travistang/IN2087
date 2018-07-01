"use strict";

import React from 'react';
import {Table} from 'react-bootstrap';
import ItemListRow from './ItemListRow';
import ItemListRowOffer from './ItemListRowOffer';

export default class ItemList extends React.Component{

    constructor(props){
        super(props);
    }


   /* items()
    {
        if(this.props.isOffers)
        {
            if(this.props.offers)
            {
                        return this.props.offers;
            }
            else
            {
            return [];
            }
        }
        else
        {
            if(this.props.wants)
                {
                    console.log("ItemList.wants: "+this.props.wants);
                    return this.props.wants;
                }
            else
                {
                    console.log("ItemList.offers: "+this.props.offers)
                    return [];
                }
        }
    }
*/


offers()
{
    console.log("ItemList: ");
    console.log(this.props.offers);
    if(this.props.offers)
    {
      return(  this.props.offers.map(function(offer){
                            return <ItemListRowOffer key={offer._id} offer={offer}></ItemListRowOffer>
                        })
      )
    }
    else
    {
        return ("");
    }

}


wants()
{
    if(this.props.wants)
        {
          return(  this.props.wants.map(function(want){
                                return <ItemListRow key={want._id} want={want}></ItemListRow>
                            })
          )
        }
        else
        {
            return ("");
        }

}

all(){
    return(
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
                    {this.props.isOffers?this.offers():this.wants()}


                    </tbody>

                </Table>
                </div>

    )
}

categories(){
if(this.props.category="things"){


}

}




    render() {

        return (
        <div>

        <Table hover condensed={false}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th ></th>
                    <th></th>


                </tr>
            </thead>
            <tbody>
            {this.props.isOffers?this.offers():this.wants()}


            </tbody>

        </Table>
        </div>



        )
    }




}