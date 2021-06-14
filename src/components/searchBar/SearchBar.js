import React, { useEffect } from 'react'
import { useState } from 'react';
import '../searchBar/SearchBar.css';

const SearchBar = ({guardarBusqueda,setImagenesxpagina,guardarImagenes}) => {
    

    const [tema,guardarTema]=useState('');
    const [error,guardarError]=useState(false);

    

    const buscarImagenes = e =>{

        e.preventDefault();
        //Validar
        if(tema.trim()===''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarImagenes([]);
        //Enviar tema de busqueda hacia el componente principal
        guardarBusqueda(tema);

        guardarTema('');
        setImagenesxpagina(16);
    }

    useEffect(() => {
    
        const input = document.querySelector('.search-text-picture');
        
        if(error){
    
             const border = ` 2.5px solid red`;         
            //Se asignan las constantes al style de la caja (color y sombra). 
            input.style.border = border;
        }else{
            const border = ` none`;         
            //Se asignan las constantes al style de la caja (color y sombra). 
            input.style.border = border;
        }
    })



    return (
        <>
            <div className="search-bar-picture">
                <form
                 onSubmit={buscarImagenes}
                >
                    <input 
                        className="search-text-picture" 
                        name="q"  
                        autoComplete="off" 
                        autoCorrect="off" 
                        placeholder="Buscar..."
                        value={tema}
                        onChange={e=>guardarTema(e.target.value)}
                    />
                    <div className="search-icon-picture">
                        <div className="center-lupa-picture">
                            {
                                (tema)
                                ?
                                    <div onClick={e=>guardarTema('')} className="btn-X-picture">
                                        <span className="spanX"> X </span>
                                    </div>
                                :
                                    <img src="assets\picturesAssets\lupa-dark.svg" alt="lupa" className="svg-lupa-picture"/>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SearchBar
