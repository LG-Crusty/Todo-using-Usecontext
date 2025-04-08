import { useState } from "react"
import { useTodo } from "../context"

export function TodoSect({sendedTodo}){

const [isEditable, setisEditable] = useState(false)
const {deleteTodo, updateTodo, taskComplete} = useTodo()
const [todoMsg, settodoMsg] = useState(sendedTodo.task)


const editTodo = ()=>{
updateTodo(sendedTodo.id, {...sendedTodo, Todo: todoMsg})
setisEditable((prev) => !prev)}
 
const complete = ()=>{taskComplete(sendedTodo.id)}
  
return (
    <>
        <div className="w-full h-auto flex flex-wrap flex-row gap-x-2 p-2">

            <input type="checkbox"
            className="w-4 h-4 mt-1" 
            checked = {sendedTodo.complete}
            onChange={complete} />

            <input type="text" 
            className="w-72 h-auto pl-1 ml-2 text-black"
            value={todoMsg}
            onChange={(e)=>{settodoMsg(e.target.value)}}
            readOnly = {isEditable === false} />

            <button 
            className="w-auto h-auto bg-black text-white px-3 ml-3"
            onClick={()=>{
                if(sendedTodo.complete === true){return}

                isEditable? setisEditable((prev) => !prev) : editTodo()
                
            }}
            >{isEditable ? "📁": "✏️" }</button>

            <button
            className="w-auto h-auto bg-black text-white px-3 ml-3"
            onClick={()=>deleteTodo(sendedTodo.id)}>
            ❌</button>
            
        </div>
    </>
    )
}