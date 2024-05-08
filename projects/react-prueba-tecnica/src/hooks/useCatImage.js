 
 import { useEffect,useState } from "react";
 export function useCatImage({fact}){
    const[imageUrl,setImageUrl] = useState();
    useEffect(()=>{
        if(!fact) return
        const firstWord=fact.split(' ',3).join(' ');
        fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
            .then(res=>res.json())
            .then(response=>{
                const{url}=response
                setImageUrl(`https://cataas.com${url}`)
    
         })
    
       },[fact])

    return {imageUrl}
}//Los custom hooks, son funciones que pueden tener estados dentro, como cajas negras. Los estados/hooks no pueden estar dentro de funciones.
