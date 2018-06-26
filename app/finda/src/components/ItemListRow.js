"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react';
import { Link } from 'react-router-dom';

// import { SimpleLink } from './SimpleLink';

//import UserService from '../services/UserService';


export class ItemListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    //   {UserService.isAuthenticated() ?
    //<TableColumn><Link to={`/edit/${this.props.movie._id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
    //: <TableColumn><Link to={'/login'}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
    //}
    //  {UserService.isAuthenticated() ?
    //<TableColumn><Button onClick={() => this.props.onDelete(this.props.movie._id)} icon>delete</Button></TableColumn>
    // : <TableColumn><Link to={'/login'}><FontIcon>delete</FontIcon></Link></TableColumn>
    //}

    render() {

        return (
            <TableRow key={this.props.key}>
    <TableColumn>
        <Link to={`/show/${this.props.want._id}`}>
    <FontIcon>image</FontIcon>
        </Link>
        </TableColumn>

        <TableColumn>
        <Link to={`/show/${this.props.want._id}`}>
        {this.props.want.title}
    </Link>
        </TableColumn>


        </TableRow>
    );
    }
}