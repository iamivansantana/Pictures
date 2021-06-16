import React from 'react';
import '../modal/ModalScreen.css';

const ModalScreen = ({ largeImageURL,tags }) => {
    return (
        <>
          <div className="gallery-item-modal" >
                <div className="image-modal">
                    <img src={largeImageURL} alt={tags}/>
                </div>  
            </div>
        </>
    )
}

export default ModalScreen
