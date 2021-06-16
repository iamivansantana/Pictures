import React, { useContext } from 'react';
import PictureCard from './PictureCard';
import modalContext from '../../context/modalContext/modalContext';

const ListadoPicureCard = ({imagenes}) => {
    
    //Acceso al Context del Modal
    const {setIsOpen,setImagenModal} = useContext(modalContext);
    
    //Inicializa un contador para agregar un nuevo campo al arreglo.
        //Que ira del 1 al 8 y servira para asignar las clases de posicionamiento de cada card en el Grid
    let contador = 0;

    //crea un nuevo array con el nuevo valor numberClass
    const myImages = imagenes.map(item => {
    
        contador++
        if(contador === 9) contador=1;
        let  numberClass = item.numberClass = contador;

        //Retorna una copia del item + el nuevo campo "numberClass"
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
                    setImagenModal={ setImagenModal }
                />

            ))}

        </>
    )
}

export default ListadoPicureCard
