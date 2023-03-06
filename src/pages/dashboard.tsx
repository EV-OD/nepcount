import ItemEditor from 'components/items/itemEditor'
import MainLayout from 'components/layout/main.layout'
import Navbar from 'components/navbar/navbar'
import Tab from 'components/tab/tab'
import { button } from 'components/tailwind.class'
import Head from 'next/head'
import React from 'react'
import type { NextPageWithLayout } from './_app'


const Dashboard: NextPageWithLayout = () => {
    return (
        <div className='w-full h-full'>
            <ItemEditor />
        </div>
    )
}

Dashboard.getLayout = (page) => {
    return <MainLayout>
        <Navbar />
        <Tab />
        {page}
    </MainLayout>
}





export default Dashboard