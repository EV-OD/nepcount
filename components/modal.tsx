import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: React.ReactNode,
    isOpen: boolean,
    buttons: React.ReactNode,

}

function Modal(props: PortalProps) {
    const ref = useRef<Element | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.querySelector<HTMLElement>("#portal")
        setMounted(true)
    }, [])

    return (mounted && ref.current) ? createPortal(<>
        {
            props.isOpen &&
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-600/70">
                <div className="pt-8 pb-5 px-7 modal absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 modalArea">
                    <div className="content px-2">{props.children}</div>
                    <div className="actions flex gap-2 mt-3">
                        {props.buttons}
                    </div>
                </div>
            </div>
        }
    </>
        ,
        ref.current) : null
}

export default Modal