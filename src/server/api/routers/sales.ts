import { Prisma } from "@prisma/client";
import { prisma } from "~/server/db";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import searchItems from "~/utils/items";
import { getStartAndEndOfToday } from "~/utils/time";

export const salesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.soldItem.findMany({
      where: {
        items: {
          userId: ctx.session.user.id,
        },
      },
      include: {
        items: true,
      },
    });
  }),
  getTodayAll: protectedProcedure.query(async ({ ctx }) => {
    const today = getStartAndEndOfToday();

    return await ctx.prisma.soldItem.findMany({
      where: {
        soldDate: {
          gte: today.start,
          lte: today.end,
        },
      },
      include: {
        items: true,
      },
    });
  }),
  addItem: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        itemid: z.string(),
        quantity: z.number(),
        soldPrice: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.soldItem.create({
        data: {
          soldDate: input.date,
          itemId: input.itemid,
          quantity: input.quantity,
          soldPrice: input.soldPrice,
        },
      });
      await ctx.prisma.item.update({
        where: {
          id: input.itemid,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
    }),
});
