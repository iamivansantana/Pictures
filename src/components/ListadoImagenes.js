import React from 'react'
import Imagen from './Imagen'

const ListadoImagenes = ({imagenes}) => {
//   const myUsers = [
//     { name: 'shark', likes: 'ocean' },
//     { name: 'turtle', likes: 'pond' },
//     { name: 'otter', likes: 'fish biscuits' },
//     { name: 'shark', likes: 'ocean' },
//     { name: 'turtle', likes: 'pond' },
//     { name: 'otter', likes: 'fish biscuits' },
//     { name: 'shark', likes: 'ocean' },
//     { name: 'turtle', likes: 'pond' },
//     { name: 'otter', likes: 'fish biscuits' },
// ]
// let contador = 0;

// const usersByLikes = myUsers.map(item => {
  
//   contador++
//   if(contador === 5) contador=1;
  
//   const container = {};
//     container[item.name] = item.likes;
//     container.age = contador;

//     return container;
// })

// console.log(usersByLikes);
    return (
        <>
              <div className="col-12 p-5 row">
                  {imagenes.map(imagen=>(
                    <Imagen 
                      key={imagen.id}
                      imagen={imagen}
                    />
                  ))}
              </div>
        </>
    )
}

export default ListadoImagenes
