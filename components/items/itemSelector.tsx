import { Item } from '@prisma/client'
import React, { useState } from 'react'
import { api } from '~/utils/api'

type ItemSelectorPropsType = {
    items: Item[] | undefined,
    isLoading: boolean
}

function ItemSelector({ items, isLoading }: ItemSelectorPropsType) {
    const { data } = api.items.getField.useQuery()
    const [isChecked, setIsChecked] = useState(true)
    return (
        <div>
            {isLoading && <p>Loading</p>}
            <form>
                {
                    data?.map((item: any, i: number) => {
                        return <CheckBox item={item} i={i} key={i} />
                    })
                }
            </form>
        </div>
    )
}


export default ItemSelector

function CheckBox(item: any, i: number) {
    const [isChecked, setIsChecked] = useState(true)
    let id = `${item.item.COLUMN_NAME}${i}`
    return <div className='flex gap-3'>
        <input type="checkbox" className='w-4' key={id} checked={isChecked} id={id} name={id} value={item.COLUMN_NAME} onChange={() => setIsChecked(c => !c)} />
        <label htmlFor={id} className='text-xl relative -top-[1px] capitalize cursor-pointer select-none'>{item.item.COLUMN_NAME}</label>
    </div >
}
