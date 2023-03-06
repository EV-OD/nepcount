import { Item } from '@prisma/client'
import Topbar from 'components/items/topbar'
import MainLayout from 'components/layout/main.layout'
import Modal from 'components/modal'
import Navbar from 'components/navbar/navbar'
import Tab from 'components/tab/tab'
import { button } from 'components/tailwind.class'
import React, { KeyboardEvent, useRef, useState } from 'react'
import { api } from '~/utils/api'
import { NextPageWithLayout } from './_app'



const Sales: NextPageWithLayout = () => {
    const { data: salesData } = api.sales.getTodayAll.useQuery()
    const utils = api.useContext()
    const searchMutation = api.items.searchItem.useMutation()
    const searchInputRef = useRef<HTMLInputElement>(null)

    const quantityRef = useRef<HTMLInputElement>(null)
    const soldPriceRef = useRef<HTMLInputElement>(null)

    const [active, setActive] = useState<number | null>(null)
    const currentItem = useRef<Item | null>(null)
    const [isAutoComplete, setIsAutoComplete] = useState(false)
    const addMutation = api.sales.addItem.useMutation()
    const handleSearch = () => {
        if (searchInputRef.current?.value != "") {
            setIsAutoComplete(false)
        }
        if (searchInputRef.current) {
            setIsAutoComplete(true)
            searchMutation.mutate({
                keyword: searchInputRef.current?.value,
                finished: true
            })
        }
        if (searchMutation.data?.length == 0) {
            currentItem.current = null
            setIsAutoComplete(false)
        }

    }
    const keyPressed = (e: KeyboardEvent) => {
        if (searchInputRef.current?.value === "") {
            setIsAutoComplete(false)
            if (soldPriceRef.current) {
                soldPriceRef.current.value = ""
            }
            return
        }
        if (active === null) {
            setActive(0)
        }
        if (searchMutation.data) {
            const maxIndex = searchMutation.data?.length - 1

            if (e.code === "ArrowDown") {
                if (maxIndex !== active) {
                    setActive(a => a as number + 1)
                } else {
                    setActive(0)
                }
            } else if (e.code === "ArrowUp") {
                if (active !== 0) {
                    setActive(a => a as number - 1)
                } else {
                    setActive(maxIndex)
                }
            }
            if (e.code === "Enter") {
                if (searchInputRef.current) {
                    const item = searchMutation.data.filter(item => item.id === currentItem.current?.id)
                    if (item && item.length > 0) {
                        searchInputRef.current.value = item[0]?.name as string
                        setSoldPrice()
                    }
                }
                setIsAutoComplete(false)
            }
        }
    }

    const setSoldPrice = () => {
        if (soldPriceRef.current && currentItem.current?.sellingprice) {
            soldPriceRef.current.value = `${currentItem.current.sellingprice}`
        }
    }

    const mutateSales = () => {
        const todayISOString = new Date().toISOString();
        if (currentItem.current) {
            addMutation.mutate({ date: todayISOString, itemid: currentItem.current.id, quantity: Number(quantityRef.current?.value), soldPrice: Number(soldPriceRef.current?.value) }, {
                onSuccess: () => {
                    utils.sales.invalidate().then(() => { console.log(1) }).catch(() => { console.log(1) })
                }
            })
        }
    }

    const handleAdd = () => {
        mutateSales()
    }
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="input-area flex flex-col  gap-2 mb-1">
                <div className="topbar px-3 py-2 flex w-full bg-slate-300">
                    <button className="addbtn hover:bg-slate-800 bg-slate-700 text-white px-3 py-1 rounded" onClick={() => setIsOpen(true
                    )}>Add</button>
                </div>
                <Modal isOpen={isOpen} buttons={
                    <div className='flex gap-1 justify-end w-full mr-2 mt-2'>
                        <button className="text-white bg-red-700 px-3 py-1 rounded " onClick={() => setIsOpen(false)}>close</button>
                        <button className="text-white bg-slate-700 px-3 py-1 rounded " onClick={handleAdd}>Add</button>
                    </div>
                }>
                    <div className="input-wrapper flex flex-col gap-2 text-sm">
                        <div className="searchinput flex flex-col relative">
                            <label htmlFor="">Item</label>
                            <input type="text" className='px-2 py-2 text-xl' ref={searchInputRef} onInput={handleSearch} onKeyDown={keyPressed} />
                            {isAutoComplete &&
                                <div className="absolute top-[70px] w-full box bg-slate-300 text-black flex flex-col">
                                    {searchMutation.data && searchMutation.data.map((item, i) => {
                                        let classT = ""
                                        if (i == active) {
                                            currentItem.current = item
                                            classT = 'bg-blue-500 text-white'
                                        }
                                        return <p key={i} className={classT + " px-2 py-1"}>{item.name}</p>
                                    })}
                                </div>
                            }
                        </div>
                        <div className="quantity-area w-full flex flex-col">
                            <label htmlFor="">Quanitiy</label>
                            <input ref={quantityRef} className="quantity px-2 py-2 text-xl" min={0} max={currentItem.current?.quantity} type="number" />
                        </div>
                        <div className="each-sold-price w-full flex flex-col">
                            <label htmlFor="">sold price(Each)</label>
                            <input ref={soldPriceRef} className="discount px-2 py-2 text-xl" type="number" />
                        </div>
                    </div>
                </Modal>
            </div>
            <div>
                {salesData && salesData?.map((solditem, i) => {
                    return <h1 key={i} className='bg-white'>{solditem.items.name}</h1>
                })}
            </div>
        </>
    )
}

Sales.getLayout = (page) => {
    return <>
        <MainLayout>
            <Navbar />
            <Tab />
            {page}
        </MainLayout>
    </>
}



export default Sales