"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react';

import { ItemListRow } from './ItemListRow';


export const ItemList =({data,isForWants})=>(

   <DataTable plain>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((want, i) => <ItemListRow key={i} want={want}/> )}
            </TableBody>
            </DataTable>

);