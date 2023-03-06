import Modal from 'components/modal'
import { button } from 'components/tailwind.class'
import React, { useRef, useState } from 'react'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { AppRouter } from '~/server/api/root'
import { api } from '~/utils/api'
import ItemView from './itemView'
import Topbar from './topbar'


function ItemEditor() {
    const [isInputOpen, setIsInputOpen] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    const [itemCostPrice, setItemCostPrice] = useState('')
    const [itemSellingPrice, setItemSellingPrice] = useState('')
    const addinputRef = useRef<HTMLInputElement>(null)
    const searchinputRef = useRef<HTMLInputElement>(null)
    const utils = api.useContext()
    const searchMutation = api.items.searchItem.useMutation()
    const [isOpen, setIsOpen] = useState(false)


    const mutate = api.items.addItem.useMutation({
        async onSuccess() {
            await utils.items.invalidate()
            if (searchinputRef.current?.value != "") {
                searchMutation.mutate({ keyword: searchinputRef.current?.value as string })

            }
        }
    })

    const handleAdd = () => {
        setIsOpen(true)
        setIsInputOpen(!isInputOpen)
    }

    const handleFormSubmit = async () => {

        try {
            const newItem = {
                name: itemName,
                quantity: parseInt(itemQuantity),
                costprice: parseFloat(itemCostPrice),
                sellingprice: parseFloat(itemSellingPrice),
            }

            await mutate.mutateAsync(newItem)

            setItemName('')
            setItemQuantity('')
            setItemCostPrice('')
            setItemSellingPrice('')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="items-center text-white text-xl gap-4">
                <Modal isOpen={isOpen} buttons={<div className='flex gap-3 justify-end w-full'>
                    <button type='button' className="bg-slate-300 px-4 py-3" onClick={() => {
                        handleFormSubmit().then(() => {
                            // Do something after the Promise resolves
                        }).catch((error) => {
                            // Handle any errors that occur
                        });
                    }}>Add</button>
                    <button type="button" className="bg-slate-300 px-4 py-3" onClick={() => {
                        setIsOpen(false)
                    }}>Cancel</button>
                </div>}>
                    <form className="text-black flex w-full flex-col gap-3">
                        <input
                            type="text"
                            ref={addinputRef}
                            value={itemName}
                            onChange={(event) => setItemName(event.target.value)}
                            placeholder="Item name"
                            className="px-5 py-2 w-full box-border"
                            required
                        />
                        <input
                            type="number"
                            value={itemQuantity}
                            onChange={(event) => setItemQuantity(event.target.value)}
                            placeholder="Quantity"
                            className="px-5 py-2 w-full box-border"
                            required
                        />
                        <input
                            type="number"
                            value={itemCostPrice}
                            onChange={(event) => setItemCostPrice(event.target.value)}
                            placeholder="Cost Price"
                            className="px-5 py-2 w-full box-border"
                            required
                        />
                        <input
                            type="number"
                            value={itemSellingPrice}
                            onChange={(event) => setItemSellingPrice(event.target.value)}
                            placeholder="Selling Price"
                            className="px-5 py-2 w-full box-border"
                            required
                        />
                    </form>
                </Modal>
                <div className="area">
                    < Topbar onClick={() => searchMutation.mutate({ keyword: searchinputRef.current?.value as string })} searchinputRef={searchinputRef} handleAdd={handleAdd} items={searchMutation.data} isLoading={searchMutation.isLoading} />
                    <div className="view">
                        <table className='w-full text-black text-sm'>
                            <thead>
                                <tr className='shadow-md'>
                                    <th className='text-left border-2 border-slate-200 py-2'>Name</th>
                                    <th className='text-center border-2 border-slate-200 py-2'>Quantity</th>
                                    <th className='text-center border-2 border-slate-200 py-2'>Cost Price</th>
                                    <th className='text-center border-2 border-slate-200 py-2'>Selling Price</th>
                                    <th className='text-center border-2 border-slate-200 py-2'>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchMutation.data?.map((item, i) => {
                                    return <ItemView item={item} key={i} />
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </>
    )
}



export default ItemEditor
