import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import modalContext from '../../context/modalContext/modalContext';
import Modal from '../modal/Modal';
import ModalScreen from '../modal/ModalScreen';
import ListadoPicureCard from '../picturesCards/ListadoPicureCard';
import SearchBar from '../searchBar/SearchBar';
import './PicturesScreen.css';

const PicturesScreen = () => {

    //State que guatda las busquedas
    const[busqueda,guardarBusqueda]=useState('Colors');
    //State que guarda el arreglo de imagenes obtenidas por la API
    const[imagenes,guardarImagenes]=useState([]);
    //State que guarda la pagina en la que estamos del resultado de la API
    const[paginaactual,guardarPaginaActual]=useState(1);
    //State que guarda el total de paginas del resultado de la API
    const[totalpaginas,guardaTotalPaginas]=useState(1);
    //State que indica cuantas imagenes agregar por pagina
    const[imagenesxpagina,setImagenesxpagina]=useState(16);
    
    //Context de las funciones de la ventana Modal
    const {isOpen, setIsOpen,imagenModal} = useContext(modalContext);    


    //useEffect para consultar la api cada que paginaActual o busqueda Cambian.
    useEffect(() => {
        //Si la busqueda esta vacia no se ejecuta la consulta
        if(busqueda==='')return;
        
        const consultarAPI = async()=>{

            //Para obtener tu key registrate en la pagina de pixabay.com
            const key= 'AQUI VA TU PROPIA KEY';
            const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesxpagina}&page=${paginaactual}`;
    
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            //se utiliza array.concat() para agregar las imagenes de la nueva pagina a las anteriores.
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

            //Obtiene el alto de la pagina, alto de la barra, y el scroll recorrido 
            let {scrollTop,clientHeight, scrollHeight}= document.documentElement;
            // console.log(scrollTop,clientHeight,scrollHeight);

            //Condicion para InfiniteScroll
                //En moviles algunos navegadores agregan 56px que agregamos a la suma de (scrollTop + clienteHeight)
                //se resta 1 a scrollHeight para evitar conflicto con decimales.
            if (56+scrollTop+clientHeight>=scrollHeight-1) {
            
                // console.log('fin');

                //Si la condicion se cumple Se pasa a la pagina siguiente
                const nuevaPaginaSiguiente = paginaactual + 1;
                
                //Return si se terminana las paginas
                if(nuevaPaginaSiguiente > totalpaginas)return;
                
                //Spinner para simular carga
                spinner.classList.add('show')

                setTimeout(() => {
                    //Se agrega la pagina siguiente a la acual.
                    guardarPaginaActual(nuevaPaginaSiguiente);
                    spinner.classList.remove('show');
                }, 600);
            }
        }   
        
        //Se agrega la funcion ventana al evento scroll.
         window.addEventListener("scroll",ventana);
        
        
        // Devolvemos una función para anular la suscripción al evento
            // y evitar que cada pagina nueva se dupliquen resultados.
        return () => {
            window.removeEventListener("scroll",ventana);
        }
        
    });
    
    //Funcion para boton Up
    const up = () =>{
        //Mover Pantalla Hacia arriba
        const jumbotron = document.querySelector('.jumbotronn');
        jumbotron.scrollIntoView({behavior:'smooth'});
        
    }

    
     //Funcion para botones de sugerencias.   
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
                        {(imagenModal)? 
                            <ModalScreen 
                                largeImageURL={ imagenModal.largeImageURL }
                                tags={ imagenModal.tags }
                            />  :null}
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
                                <div className="logo-picture" >
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
                                        busqueda={ busqueda }
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
