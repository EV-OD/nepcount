import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import type { NextPageWithLayout } from '~/pages/_app'


const Tab: NextPageWithLayout = () => {
    const router = useRouter()
    const tabs = [
        {
            name: "Items",
            component: <h1>items</h1>,
            path: "/dashboard"
        },
        {
            name: "Today's Sales",
            component: <h1>Sales</h1>,
            path: "/sales"
        }
    ]
    return (
        <div className='flex'>
            <div className="tabArea mt-0 flex gap-1 bg-slate-400 pl-2 w-full">
                {tabs.map(tab => {
                    return (
                        <Link href={tab.path} className={'bg-white px-4 hover:bg-slate-300 py-3 text-sm font-semibold' + " " + (router.pathname === tab.path ? "border-b-4 border-slate-700 bg-slate-200" : "")}>{tab.name}</Link>
                    )
                })}
            </div>
        </div>
    )
}



export default Tab