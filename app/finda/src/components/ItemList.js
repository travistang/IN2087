"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { ItemCard} from './ItemCard/ItemCard';
//import Page from './Page'


export const ItemList = ({data, onDelete}) => (
<div>
    <DataTable plain>
<TableHeader>
<TableRow>
/*<TableColumn></TableColumn>
<TableColumn>Name</TableColumn>
<TableColumn>Edit</TableColumn>
<TableColumn>Remove</TableColumn>*/
</TableRow>
</TableHeader>
<TableBody>
{data.map((want) =>(<ItemCard want={want} />) )}
</TableBody>
</DataTable>
</div>
);

