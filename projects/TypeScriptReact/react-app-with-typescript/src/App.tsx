import React, { useEffect } from 'react';
import './App.css';
import  {useState }from 'react';
import List from './components/List';
import Form from './components/Form';
import {Sub} from  './components/type';

const INITIAL_STATE = [  {
  nick: 'ErGonsa',
  subMonths:3,
  avatar: 'https://i.pravatar.cc/150?img=midudev',
  description:'Dapeli hace de moderador a veces'
},
{
  nick: 'ErGonsa',
  subMonths:5,
  avatar: 'https://i.pravatar.cc/150?img=midudev',
}
]
interface AppState {
  subs:Sub[]
  newSubsNumber:number
}

function App() {
  const [subs, setSubs] = useState<AppState['subs']>([]);
  const[newSubsNumber,setNewSubsNumber] = useState<AppState['newSubsNumber']>(0);

  useEffect(() =>{
    setSubs(INITIAL_STATE)
  },[])

  return (
    <div className="App">

    <h1>Midu subs</h1>
    
    <List subs={subs}></List>
    <Form></Form>
      


    </div>
  );
}

export default App;
