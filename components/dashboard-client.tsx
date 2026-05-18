"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormDialog } from "./form-dialog";

export default function HomeClient({ itemStocks }: { itemStocks: any[] }) {
  const [items, setItems] = useState<any[]>(itemStocks);
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedQuantityInStock, setSelectedQuantityInStock] = useState(0);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIsActive, setSelectedIsActive] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = (name: string, description: string, quantityInStock: number, unitPrice: number, category: string, isActive: boolean) => {
    setSelectedName('');
    setSelectedDescription('');
    setSelectedQuantityInStock(0);
    setSelectedUnitPrice(0);
    setSelectedCategory('');
    setSelectedIsActive(true);
    // AddItem({
    //   id: 0,
    //   name: name,
    //   description: description,
    //   quantity_in_stock: quantityInStock,
    //   unit_price: unitPrice,
    //   category: category,
    //   is_active: isActive
    // });
    setOpen(false);

  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-2">Total Items</h2>
          <p className="text-3xl font-bold">{items.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-2">Total Value</h2>
          {/* <p className="text-3xl font-bold">${items.reduce((sum, item) => sum + (item.quantity_in_stock * item.unit_price), 0).toFixed(2)}</p> */}
          <p className="text-3xl font-bold">23</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-2">Low Stock Items</h2>
          {/* <p className="text-3xl font-bold">{items.filter(item => item.quantity_in_stock < 10).length}</p> */}
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow"
            onClick={handleClickOpen}
        >
            Add Item
        </button>
        <FormDialog 
          selectedName={selectedName}
          selectedDescription={selectedDescription}
          selectedQuantityInStock={selectedQuantityInStock}
          selectedUnitPrice={selectedUnitPrice}
          selectedCategory={selectedCategory}
          selectedIsActive={selectedIsActive}
          open={open}
          onClose={handleClose} 
        />
        <button className="bg-white border px-4 py-2 rounded-xl shadow">
            Refresh
        </button>
      </div>

      {/* Table */}
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.itemName}
              </TableCell>
              <TableCell align="center">{row.itemDescription}</TableCell>
              <TableCell align="center">{row.itemQuantity}</TableCell>
              <TableCell align="center">{row.itemSize}</TableCell>
              <TableCell align="center">{row.itemType}</TableCell>
              <TableCell align="center">{row.isActive ? 'Active' : 'Inactive'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}