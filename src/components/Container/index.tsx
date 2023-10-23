import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

export default function Container(props: ContainerProps) {

    return (
        <div className='flex flex-col w-3/4 mx-auto'>
            {props.children}
        </div>
    )
}