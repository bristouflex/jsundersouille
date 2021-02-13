import React from 'react'

export default function Log({children, type}) {
    return (
        <div className={type}>
            {children}
        </div>
    )
}
