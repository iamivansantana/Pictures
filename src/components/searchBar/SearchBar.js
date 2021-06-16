import React, { useEffect } from 'react'
import { useState } from 'react';
import '../searchBar/SearchBar.css';

const SearchBar = ({guardarBusqueda,setImagenesxpagina,guardarImagenes,busqueda}) => {
    
    //State para guardar busqueda
    const [tema,guardarTema]=useState('');
    //State para error de busqueda
    const [error,guardarError]=useState(false);


    //Funcion para submit de Busqueda
    const buscarImagenes = e =>{

        e.preventDefault();
        
        //Validar
        if(tema.trim()===''){
            guardarError(true);
            return;
        }
        //Si busqueda es igual al tema mostrado Return para evitar volver a cargar los mismos elementos
        if (tema === busqueda) return;

        guardarError(false);
        //se restablece el State de imagenes.
        guardarImagenes([]);
        //Enviar tema de busqueda hacia el componente principal
        guardarBusqueda(tema);
        //se restablece state de busqueda
        guardarTema('');
        //cargar 16 imagenes despues de labusqueda
        setImagenesxpagina(16);
        
    }

    //Efecto para controlar errores de Busqueda
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
                 name="envia"
                >
                    <input 
                        type="text"
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
