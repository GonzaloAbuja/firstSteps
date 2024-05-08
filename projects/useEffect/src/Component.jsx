import { useState,useEffect} from "react"
const Component=()=>{
    const[value,setValue]= useState(false)
    useEffect(()=>{
        console.log("Codigo a ejecutar")
    }, [])//Dentro del array si cambia el valor que pasamso por parametro se ejecuta de nuevo
        //Winner

}
//Use Effect recibe dos paramatros, el codigo a ejecutar y la lista de
//dependencias, el codigo a ejecutar lo representamos en una funcion arrow

//La lista de dependencias e sun parametro opcional en forma de arrow,
//Y se ejecuta en cada renderizado
//Si pasamos array vacio solo se renderiza una vez el metodo
