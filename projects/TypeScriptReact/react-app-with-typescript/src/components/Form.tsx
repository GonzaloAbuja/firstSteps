import { useState } from "react";
import {Sub} from  './type'
interface FormState{
    inputValue:Sub,
}

const Form=()=>{
    const [inputValues,setInputValues]=useState<FormState['inputValue']>({
        nick:'',
        subMonths:0,
        avatar:'',
        description:''

    })
    const handleSubmit =()=>{

    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>)=>{
        
        setInputValues({...inputValues,[e.target.name]:e.target.value})

        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick"/>
                <input  onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="subMonths"/>
                <input  onChange={handleChange} value={inputValues.avatar} type="text" name="avatar" placeholder="avatar"/>
                <textarea onChange={handleChange} value={inputValues.description}  name="description" placeholder="description"/>
                <button>Save new Sub!</button>

            </form>
        </div>

    )
}
export default Form;