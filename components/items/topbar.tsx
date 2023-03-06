import { Item } from '@prisma/client';
import { UseMutationResult } from '@tanstack/react-query';
import { button } from 'components/tailwind.class'
import React, { useState } from 'react'
import ItemView from './itemView'
import { BsSearch } from "react-icons/bs"
import Modal from 'components/modal';
import ItemSelector from './itemSelector';



type TopbarType = {
    handleAdd: () => void,
    searchinputRef: React.RefObject<HTMLInputElement>,
    onClick: () => void,
    items: Item[] | undefined,
    isLoading: boolean

}

function Topbar({ handleAdd, searchinputRef, onClick, items, isLoading }: TopbarType) {
    console.log(items)
    const [isFieldModalOpen, setIsFieldModalOpen] = useState(false)

    return (
        <div className='bg-slate-300 w-full py-1'>
            <div className="input-area flex flex-col gap-1 mx-3">
                <div className="search flex gap-4">
                    <input ref={searchinputRef} type="text" className=" rounded-md px-3 py-1 text-black w-full" />
                    <div className="actions">
                        <button className="hover:bg-slate-500 bg-slate-400 px-0 py-0 h-[40px] w-[40px] rounded-full flex justify-center items-center" onClick={onClick}>
                            <BsSearch size={18} />
                        </button>
                    </div>
                </div>
                <div className="modifier flex gap-2">
                    <button className="bg-slate-800 text-sm px-2 py-1 rounded" onClick={handleAdd}>
                        Add Item
                    </button>
                    <button className="bg-slate-500 text-sm px-2 py-1 rounded" >
                        Filter
                    </button>
                    <button className="bg-slate-500 text-sm px-2 py-1 rounded" onClick={() => setIsFieldModalOpen(true)}>
                        Field
                    </button>
                </div>
            </div>
            <Modal isOpen={isFieldModalOpen} buttons={
                <div className='flex gap-2 w-full justify-end'>
                    <button className='red-ui-button' onClick={() => setIsFieldModalOpen(false)}>Close</button>
                    <button className='ui-button'>add</button>
                </div>}>
                <>
                    <ItemSelector items={items} isLoading={isLoading} />
                </>
            </Modal>
        </div>
    )
}



export default Topbar