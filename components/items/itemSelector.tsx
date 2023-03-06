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
                    data?.map((item, i: number) => {
                        return <CheckBox item={item} i={i} key={i} />
                    })
                }
            </form>
        </div>
    )
}


export default ItemSelector

type CheckBoxType = {
    item: {
        COLUMN_NAME: string;
        TABLE_NAME: string;
        table_schema: string;
    },
    i: number
}

function CheckBox({ item, i }: CheckBoxType) {
    const [isChecked, setIsChecked] = useState(true)
    const id = `${item.COLUMN_NAME}${i}`
    return <div className='flex gap-3'>
        <input type="checkbox" className='w-4' key={id} checked={isChecked} id={id} name={id} value={item.COLUMN_NAME} onChange={() => setIsChecked(c => !c)} />
        <label htmlFor={id} className='text-xl relative -top-[1px] capitalize cursor-pointer select-none'>{item.COLUMN_NAME}</label>
    </div >
}
