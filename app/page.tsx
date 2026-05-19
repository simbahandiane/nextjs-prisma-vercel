import HomeClient from "../components/dashboard-client";
import { itemGetAll } from "@/actions/route";

export default async function Home() {
  const itemStocks = await itemGetAll();
  
  return <HomeClient itemStocks={itemStocks} />;
}