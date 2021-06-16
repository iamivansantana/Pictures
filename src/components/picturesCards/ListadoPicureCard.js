import React, { useContext } from 'react';
import PictureCard from './PictureCard';
import modalContext from '../../context/modalContext/modalContext';

const ListadoPicureCard = ({imagenes}) => {
    
    const {setIsOpen} = useContext(modalContext);
    


    let contador = 0;

    const myImages = imagenes.map(item => {
    
        contador++
        if(contador === 9) contador=1;
        let  numberClass = item.numberClass = contador;

        return{
            ...item,
            numberClass
        }
    });

    return (
        <>
            {myImages.map((imagen,i)=>(
                
                <PictureCard
                    key={ imagen.id+i }
                    imagen={ imagen }
                    setIsOpen={ setIsOpen }
                />

            ))}

        </>
    )
}

export default ListadoPicureCard
