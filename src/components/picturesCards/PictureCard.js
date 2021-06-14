import React from 'react';
import '../picturesCards/PictureCard.css';

const PictureCard = ({imagen}) => {
    const{largeImageURL, tags, numberClass}= imagen;
    return (
        <>
            <div className={`grid-${numberClass}`}>
            {/* <div className="grid-2"> */}
                <div className="gallery-item-picture">
                    <div className="image-picture">
                        <img src={largeImageURL} alt={tags}/>
                    </div>
                    <div className="text-picture"> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default PictureCard