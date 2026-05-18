// 'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export interface FormDialogProps {
  open: boolean;
  selectedName: string;
  selectedDescription: string;
  selectedQuantityInStock: number;
  selectedUnitPrice: number;
  selectedCategory: string;
  selectedIsActive: boolean;
  onClose: (name: string, description: string, quantityInStock: number, unitPrice: number, category: string, isActive: boolean) => void;
}

export function FormDialog(props: FormDialogProps) {
  const { onClose, selectedName, selectedDescription, selectedQuantityInStock, selectedUnitPrice, selectedCategory, selectedIsActive, open } = props;
  const [name, setName] = React.useState(selectedName);
  const [description, setDescription] = React.useState(selectedDescription);
  const [quantityInStock, setQuantityInStock] = React.useState(selectedQuantityInStock);
  const [unitPrice, setUnitPrice] = React.useState(selectedUnitPrice);
  const [category, setCategory] = React.useState(selectedCategory);
  const [isActive, setIsActive] = React.useState(selectedIsActive);

  const handleClose = () => {
    console.log(name, description, quantityInStock, unitPrice, category, isActive);
    onClose(name, description, quantityInStock, unitPrice, category, isActive);
  };

  const handleListItemClick = (value: string) => {
    onClose(name, description, quantityInStock, unitPrice, category, isActive);
  };

  const label = { slotProps: { input: { 'aria-label': 'Is Active?' } } };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Item</DialogTitle>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="standard-basic-name"
          label="Name"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="standard-basic-description"
          label="Description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <TextField
          id="standard-basic-quantity"
          label="Quantity in Stock"
          value={quantityInStock}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setQuantityInStock(Number(event.target.value));
          }}
        />
        <TextField
          id="standard-basic-unit-price"
          label="Unit Price"
          value={unitPrice}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUnitPrice(Number(event.target.value));
          }}
        />
        <TextField
          id="standard-basic-category"
          label="Category"
          value={category}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCategory(event.target.value);
          }}
        />
        <Checkbox {...label} defaultChecked />

        
    </Box>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow"
        onClick={handleClose}>
        Save
    </button>
    </Dialog>
  );
}