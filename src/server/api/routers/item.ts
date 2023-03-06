import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import searchItems from "~/utils/items";

export const itemRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return (
      await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          Item: true,
        },
      })
    )?.Item;
  }),
  //   quantity     Int
  //   date         DateTime?
  //   category     String?
  //   costprice    Float
  //   sellingprice Float
  //   SoldItem     SoldItem[]
  //   user         User       @relation(fields: [userId], references: [id])
  //   userId       String
  addItem: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.number(),
        category: z.string().optional(),
        date: z.date().optional(),
        costprice: z.number(),
        sellingprice: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (
        !(await ctx.prisma.item.findUnique({
          where: {
            name: input.name,
          },
        }))
      ) {
        return await ctx.prisma.item.create({
          data: {
            name: input.name,
            quantity: input.quantity,
            category: input.category,
            date: input.date,
            costprice: input.costprice,
            sellingprice: input.sellingprice,
            userId: ctx.session.user.id,
          },
        });
      } else {
        return null;
      }
    }),
  searchItem: protectedProcedure
    .input(
      z.object({
        keyword: z.string(),
        finished: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await searchItems(
        input.keyword,
        ctx.session.user.id,
        input.finished
      );
    }),
  getField: protectedProcedure.query(async ({ ctx }): Promise<any[]> => {
    return await await ctx.prisma
      .$queryRaw`SELECT COLUMN_NAME,TABLE_NAME,table_schema from INFORMATION_SCHEMA.columns
      where table_name = "item" and table_schema="nepcount"
      ;`;
  }),
});
