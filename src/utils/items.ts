import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Item {
  id: string;
  name: string;
  quantity: number;
  date?: Date;
  category?: string;
  costprice: number;
  sellingprice: number;
}

async function searchItems(text: string, userid: string, finished = false) {
  const items = await prisma.item.findMany({
    where: {
      OR: [{ name: { contains: text } }, { category: { contains: text } }],
      ...(finished && { quantity: { gt: 0 } }),
      userId: userid,
    },
  });
  return items;
}

export default searchItems;
