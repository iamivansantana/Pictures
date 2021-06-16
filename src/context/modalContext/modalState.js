import React from 'react'
import { useState } from 'react';
import modalContext from './modalContext'

const ModalState = ( props ) => {
    
    //State de Ventana Modal
    const [isOpen, setIsOpen] = useState(false);

    //State que almacena informacion de la imagen abierta.
    const [imagenModal, setImagenModal] = useState({});

    return (
        <modalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                imagenModal,
                setImagenModal
            }}
        >
            {props.children}
        </modalContext.Provider>
    )
}

export default ModalState;
