import React from 'react';
import PictureCard from './PictureCard';

const ListadoPicureCard = ({imagenes}) => {

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
                    key={imagen.id+i}
                    imagen={imagen}
                />

            ))}

        </>
    )
}

export default ListadoPicureCard
