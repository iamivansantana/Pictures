import React from 'react'
import { useState } from 'react';
import modalContext from './modalContext'

const ModalState = ( props ) => {
    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <modalContext.Provider
            value={{
                isOpen,
                setIsOpen
            }}
        >
            {props.children}
        </modalContext.Provider>
    )
}

export default ModalState;
