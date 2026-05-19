// actions/post.ts
'use server'

import prisma from '../lib/prisma';

export async function itemPost(name: string,
    description: string,
    quantityInStock: number,
    unitPrice: number,
    category: string,
    size: string,
    color: string,
    isActive: boolean) {
    
    const postResponse = await prisma.itemStocks.create({
      data: {
        itemName: name, 
        itemDescription: description,
        itemQuantity: quantityInStock,
        itemUnitPrice: unitPrice,
        itemType:category,
        itemSize: size,
        itemColor: color,
        isActive: isActive
      }
    });

    return {
      success: true,
      data: {
        ...postResponse,
      },
    };
  }

export async function itemGetAll(){
  return await prisma.itemStocks.findMany();
}