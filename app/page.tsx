import Image from "next/image";
import prisma from "@/lib/prisma";



export default async function Home() {

  // Get all items from the database
  const items = await prisma.itemStocks.findMany();


  return (
    <div className="stack">
      <h1>Inventory Dashboard</h1>
      {items.length ? (
        items.map((item) => <div key={item.id}>{item.itemName}: {item.itemQuantity}</div>)
      ) : (
        <div className="panel">No items in inventory.</div>
      )}
    </div>
  );
}
