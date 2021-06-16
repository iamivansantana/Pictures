import React from 'react';
import '../picturesCards/PictureCard.css';


const PictureCard = ({ imagen,setIsOpen,setImagenModal }) => {

    //Desestructuracion de elementos a prop imagen.
    const{largeImageURL, tags, numberClass}= imagen;
    
    //Funcion para abrir Ventana Modal.
    const modaClick = ()=>{
        //Abre Modal
        setIsOpen(true);
        //pasa informacion de la imagen al state imagenModal en modalState.
        setImagenModal({largeImageURL: largeImageURL, tags: tags});
    }
 
    return (
        <>
            <div className={`grid-${numberClass}`}>
            {/* <div className="grid-2"> */}
                <div className="gallery-item-picture" onClick={modaClick} >
                    <div className="image-picture">
                        <img src={largeImageURL} alt={tags}/>
                    </div>
                    
                    <div className="text-picture" />
                        
                    
                </div>
            </div> 
            
        </>
    )
}

export default PictureCard;
