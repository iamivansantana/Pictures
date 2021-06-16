import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import modalContext from '../../context/modalContext/modalContext';
import Modal from '../modal/Modal';
import ListadoPicureCard from '../picturesCards/ListadoPicureCard';
import SearchBar from '../searchBar/SearchBar';
import './PicturesScreen.css';

const PicturesScreen = () => {

    const[busqueda,guardarBusqueda]=useState('Colors');
    const[imagenes,guardarImagenes]=useState([]);
    const[paginaactual,guardarPaginaActual]=useState(1);
    const[totalpaginas,guardaTotalPaginas]=useState(1);
    const[imagenesxpagina,setImagenesxpagina]=useState(16);

    const {isOpen, setIsOpen} = useContext(modalContext);

    
    

    useEffect(() => {

        if(busqueda==='')return;
        
        const consultarAPI = async()=>{

            const key= '18584834-b8939c3a0661f41d9c3094cbd';
            const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesxpagina}&page=${paginaactual}`;
    
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            const newResultado = imagenes.concat(resultado.hits);        
    
            guardarImagenes(newResultado);
            //calcula el total de paginas 
            const calcularTotalPaginar = Math.ceil(resultado.totalHits / imagenesxpagina);
            guardaTotalPaginas(calcularTotalPaginar);               
        }                    
        consultarAPI();
        
        // eslint-disable-next-line
    }, [paginaactual,busqueda]);
    

    //Function for make Infinite scroll.
    useEffect(() => {

        const spinner = document.querySelector('.spinner');

        function ventana (e){

            let {scrollTop,clientHeight, scrollHeight}= document.documentElement;
            console.log(scrollTop,clientHeight,scrollHeight);

            // if(scrollHeight<=1843)return;
            if (56+scrollTop+clientHeight>=scrollHeight-1) {
            
                console.log('fin');
                const nuevaPaginaSiguiente = paginaactual + 1;
                
                if(nuevaPaginaSiguiente > totalpaginas)return;
                
                spinner.classList.add('show')

                setTimeout(() => {
                    guardarPaginaActual(nuevaPaginaSiguiente);
                    spinner.classList.remove('show');
                }, 600);
            }
        }   
        
         window.addEventListener("scroll",ventana);
        
        
        // Devolvemos una función para anular la suscripción al evento
        return () => {
            window.removeEventListener("scroll",ventana);
        }
        
    });
    
    const up = () =>{
        //Mover Pantalla Hacia arriba
        const jumbotron = document.querySelector('.jumbotronn');
        jumbotron.scrollIntoView({behavior:'smooth'});
        
    }

    
        
    const suggestion = (name)=>{
        if (name === busqueda)return
        guardarImagenes([]);
        guardarBusqueda(name);
        guardarPaginaActual(1);
    }
    
    // //METODO PARA OBSERVAR INTERSECCIONES DE ELEMENTOS HTML EN LA PANTALLA.
    // useEffect(() => {
        
    //     const body = document.querySelector('.body-picture');
    //     const end = document.querySelector('.end-picture');   
        
    //     const secctionOneOptions = {
    //         rootMargin: "0px 0px 200px 0px"
    //     };

    //     const secctionOneObserver = new IntersectionObserver
    //     (function(
    //         entries,
    //         secctionOneObserver
    //     ){
    //         entries.forEach(entry=>{
    //             if(!entry.isIntersecting){
    //                 const border = ` none`;         
    //                 //Se elimina el style al del body (border). 
    //                 body.style.border = border;
                    
    //             }else{
    //                 console.log('fin');
    //                 const border = ` 2.5px solid red`;         
    //                  //Se asignan el string al style del body (border). 
    //                 body.style.border = border;
    //             }
    //         });
    //     },secctionOneOptions);

    //     secctionOneObserver.observe(end);

    // },[]);



    return (
        <>
            <div className="body-picture">
                <div style={BUTTON_WRAPPER_STYLES} >
                    <Modal open={isOpen} onClose={()=>setIsOpen(false)}>
                        Example modal
                    </Modal>
                </div>
                
                <div onClick={up} className="btn-up">
                    <span className="center-picture up">Up</span>
                </div>
                <div className="jumbotronn">
                    <div className="navbarContainer-picture ">
                        <div className="grid-header-picture">
                            <div className="btn-back-picture">
                                <div className="buscador-picture" style={{justifyContent:'flex-start', paddingLeft:'10px'}}>                                
                                    <img src="assets\picturesAssets\home1-light.svg" alt="home" className="btn-home-picture"/>
                                </div>
                            </div>
                                <div className="logo-picture">
                                    <div className="center-picture">
                                            <div >
                                                <img src="assets\picturesAssets\Pictures-withe.svg" alt="logo" className="logosvg-picture"/>
                                            </div>
                                    </div>
                                </div>
                            <div className="search-picture">
                                <div className="buscador-picture">
                                    <SearchBar 
                                        guardarBusqueda={guardarBusqueda}
                                        setImagenesxpagina={setImagenesxpagina}
                                        guardarImagenes={guardarImagenes}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-picture"> 
                    <div className="container-suggestions-picture">
                        <div className="suggestions-center">
                        <div className="btn-suggestions" onClick={()=>suggestion('Cars')}>Cars</div>
                        <div className="btn-suggestions" onClick={()=>suggestion('Wallpapers')}>Wallpapers</div>
                        <div className="btn-suggestions" onClick={()=>suggestion('Sunset')} >Sunset</div>
                        <div className="btn-suggestions" onClick={()=>suggestion('Sexy')} style={{backgroundColor:'#ff0055a1'}}>Sexy</div>
                        </div>
                    </div>
                    
                    
                     <div className="container-grid-picture">
                        <ListadoPicureCard
                            imagenes ={imagenes}
                        />
                     </div>

                        {(paginaactual === totalpaginas)? null
                        :
                        null
                        }
                        
                </div>
                  
            </div>  
            <div className="end-picture">
                
                {/* <span className="center-picture" style={{fontSize:'3rem'}}>°</span> */}
                <div className="center-spinner">
                    <div className="spinner show"></div>
                </div>
            </div>

                              
        </>
    )
}

export default PicturesScreen

const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1
}
