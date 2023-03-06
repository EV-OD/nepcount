import { Item } from '@prisma/client'
import React from 'react'
import { api } from '~/utils/api'

type ItemViewType = {
    item: Item
}

function ItemView({ item }: ItemViewType) {
    return (
        <tr className='border-[1px] border-slate-200'>
            <td className="text-black py-2 border-[1px] px-2 border-gray-300 capitalize">{item.name}</td>
            <td className="text-black py-2 border-[1px] px-2 border-gray-300">{item.quantity}</td>
            <td className="text-black py-2 border-[1px] px-2 border-gray-300">{item.costprice}</td>
            <td className="text-black py-2 border-[1px] px-2 border-gray-300">{item.sellingprice}</td>
            <td className="text-black py-2 border-[1px] px-2 border-gray-300">{item.date?.toDateString()}</td>
        </tr>
    )
}

export default ItemView
