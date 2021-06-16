import React from 'react'
import PicturesScreen from '../components/picturesScreen/PicturesScreen';
import ModalState from '../context/modalContext/modalState';

const Pictures = () => {
    return (
        <>
        <ModalState>
            <PicturesScreen />  
        </ModalState>
        </>
    )
}

export default Pictures
