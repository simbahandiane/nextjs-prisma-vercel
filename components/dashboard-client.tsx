"use client";

import { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormDialog } from "./form-dialog";

const summaryCards = [
  {
    label: "Total Items",
    valueKey: "totalItems",
    icon: (
      <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M4 6h16v2H4V6zm0 4h16v10H4V10zm2 2v6h12v-6H6z" />
        </svg>
      </div>
    ),
    description: "Active inventory items",
  },
  {
    label: "Total Value",
    valueKey: "totalValue",
    icon: (
      <div className="h-12 w-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 1.5c-5.8 0-10.5 4.7-10.5 10.5S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm0 18c-3.1 0-5.8-1.8-7.1-4.4l2.6-1.5c1 1.6 2.8 2.6 4.6 2.6 2.5 0 4.5-1.9 4.5-4.5S14.5 7.5 12 7.5c-1.8 0-3.5 1-4.5 2.6l-2.6-1.5C6.2 4.3 8.9 2.5 12 2.5c4.4 0 8 3.6 8 8s-3.6 8-8 8z" />
          <path d="M12.75 8.5h-1.5v1.4c-.9.2-1.5.9-1.5 1.8 0 1 .8 1.8 1.5 1.8h1.5v2h1.5v-2h1.2c.5 0 .8-.4.8-.8v-1.2c0-.5-.4-.8-.8-.8H13.5v-1.8h-1.5V8.5zm1.5 4.2h-1.2v-1.8h1.2c.2 0 .3.1.3.3v1.2c0 .2-.1.3-.3.3z" />
        </svg>
      </div>
    ),
    description: "Estimated inventory value",
  },
  {
    label: "Low Stock",
    valueKey: "lowStockCount",
    icon: (
      <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
      </div>
    ),
    description: "Items below reorder threshold",
  },
];

export default function HomeClient({ itemStocks }: { itemStocks: any[] }) {
  const [items, setItems] = useState<any[]>(itemStocks);
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedQuantityInStock, setSelectedQuantityInStock] = useState(0);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('XS');
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedIsActive, setSelectedIsActive] = useState(true);

  const totalValue = useMemo(() => {
    return items.reduce((sum, item) => {
      const quantity = Number(item.quantity_in_stock ?? item.itemQuantity ?? item.quantity ?? 0);
      const price = Number(item.unit_price ?? item.unitPrice ?? item.price ?? 0);
      return sum + quantity * price;
    }, 0);
  }, [items]);

  const lowStockCount = useMemo(() => {
    return items.filter((item) => {
      const quantity = Number(item.quantity_in_stock ?? item.itemQuantity ?? item.quantity ?? 0);
      return quantity > 0 && quantity < 10;
    }).length;
  }, [items]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    name: string,
    description: string,
    quantityInStock: number,
    unitPrice: number,
    category: string,
    size: string,
    color: string,
    isActive: boolean,
  ) => {
    setSelectedName('');
    setSelectedDescription('');
    setSelectedQuantityInStock(0);
    setSelectedUnitPrice(0);
    setSelectedCategory('');
    setSelectedSize('XS');
    setSelectedColor('White');
    setSelectedIsActive(true);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Inventory overview</p>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            onClick={handleClickOpen}
          >
            Add Item
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3 mb-6">
        {summaryCards.map((card) => {
          const value =
            card.valueKey === 'totalItems'
              ? items.length
              : card.valueKey === 'totalValue'
              ? `Php ${totalValue.toFixed(2)}`
              : lowStockCount;

          return (
            <div key={card.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
                  <p className="mt-2 text-sm text-slate-500">{card.description}</p>
                </div>
                {card.icon}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Inventory table</h2>
            <p className="text-sm text-slate-500">Review stock levels and item status.</p>
          </div>
        </div>

        <TableContainer component={Paper} sx={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }} aria-label="inventory table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 700 }}>SKU</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Quantity</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => {
                const quantity = row.quantity_in_stock ?? row.itemQuantity ?? row.quantity ?? 0;
                const status = row.isActive ? 'Active' : 'Inactive';

                return (
                  <TableRow
                    key={row.id ?? row.sku ?? `${row.name ?? 'row'}-${Math.random()}`}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#f8fafc' },
                      '&:hover': { backgroundColor: '#e2e8f0' },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.sku ?? row.id ?? row.itemId ?? '—'}
                    </TableCell>
                    <TableCell align="left">{row.itemDescription ?? row.description ?? '—'}</TableCell>
                    <TableCell align="center">{quantity}</TableCell>
                    <TableCell align="center">{`$${Number(row.unit_price ?? row.unitPrice ?? row.price ?? 0).toFixed(2)}`}</TableCell>
                    <TableCell align="center">{row.itemType ?? row.category ?? '—'}</TableCell>
                    <TableCell align="center">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <FormDialog
        selectedName={selectedName}
        selectedDescription={selectedDescription}
        selectedQuantityInStock={selectedQuantityInStock}
        selectedUnitPrice={selectedUnitPrice}
        selectedCategory={selectedCategory}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        selectedIsActive={selectedIsActive}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
