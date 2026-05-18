import prisma from "../lib/prisma";
import HomeClient from "../components/dashboard-client";

export default async function Home() {
  const itemStocks = await prisma.itemStocks.findMany();
  return <HomeClient itemStocks={itemStocks} />;
}