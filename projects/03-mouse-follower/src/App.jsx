import { useEffect,useState } from "react"
const FollowMouse = ()=>{
  const[enabled,setEnabled] = useState(false)
  const [position,setPosition] = useState({x:0,y:0});

  //Pointer move
  useEffect(() => {
    console.log("efecto ejecutado")
     const handleMove=(event)=>{
        const {clientX,clientY} = event;
        setPosition({x:clientX,y:clientY})
      
    }
    if(enabled){
      window.addEventListener('pointermove',handleMove)

    }
    return () => { //Para limpiar el efecto, devuelves una funcion siempre que se desmomnte el componente y cada vez que cambie la dependencia, ene ste caso [enabled]
      window.removeEventListener('pointermove',handleMove)
      console.log("efecto desmontado")
    }

  },[enabled])

  //Cursor 
  useEffect(() => {//No tiene parametros
    document.body.classList.toggle('no-cursor',enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }

  },[enabled])
  //[] => solo se ejecuta una vez cuanso se monta el componente
  //[enabled] => se ejecuta cada vez que cambie la dependencia o se monta
  //undefined => se ejecuta cada vez que se renderiza el componente
  //return para limpiar los efectos , se ejecuta cuando cambian las dependencias

  return (
    <main>
    <div style={ {
          position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform:`translate(${position.x}px,${position.y}px)`
        }}>
        </div>
    <button onClick={()=>setEnabled(!enabled)}>{enabled ?'Desactivar': 'Activar'} seguir puntero</button>
    </main>


  )
}
function App() {
  
  return(  
    <main>
      <FollowMouse/>
    </main>)



}

export default App
