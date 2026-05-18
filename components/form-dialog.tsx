"use client";

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
  const [category, setCategory] = React.useState("XS");
  const [isActive, setIsActive] = React.useState(selectedIsActive);
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  }

  React.useEffect(() => {
    if (open) {
      setName(selectedName);
      setDescription(selectedDescription);
      setQuantityInStock(selectedQuantityInStock);
      setUnitPrice(selectedUnitPrice);
      setCategory(selectedCategory);
      setIsActive(selectedIsActive);
    }
  }, [open, selectedName, selectedDescription, selectedQuantityInStock, selectedUnitPrice, selectedCategory, selectedIsActive]);

  const handleCancel = () => {
    onClose(selectedName, selectedDescription, selectedQuantityInStock, selectedUnitPrice, selectedCategory, selectedIsActive);
  };

  const handleSave = () => {
    onClose(name, description, quantityInStock, unitPrice, category, isActive);
  };

  const isSaveDisabled = name.trim().length === 0;

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <TextField
              label="Item Name"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Quantity in Stock"
                type="number"
                value={quantityInStock}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuantityInStock(Number(event.target.value))}
                fullWidth
                slotProps={{ htmlInput: { min: 0 } }}
              />
              <TextField
                label="Unit Price"
                type="number"
                value={unitPrice}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUnitPrice(Number(event.target.value))}
                fullWidth
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
              />
            </Stack>
            <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={() => handleCategoryChange}
                defaultValue='XS'
            >
                <MenuItem value={"XS"}>XS</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"XL"}>XL</MenuItem>
            </Select>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsActive(event.target.checked)}
                  color="primary"
                />
              }
              label="Active"
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={isSaveDisabled}>
          Save Item
        </Button>
      </DialogActions>
    </Dialog>
  );
}