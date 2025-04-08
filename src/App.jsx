import { useState, useEffect } from 'react'
import { TodoSect } from './components/TodoSection'
import {TodoProvider, useTodo} from "./context"

function App() {
 const [task, setTask] = useState([])
const [inputVal, setinputVal] = useState("")


let{ Todo, addTodo, updateTodo, deleteTodo, taskComplete} = useTodo()

  addTodo = (Todo)=>{ 
  setTask((prev)=>{
    return  [{ id : Math.floor((1 + Math.random()) * 0x10000),
      ...Todo
      }, ...prev] })
 }

  updateTodo = (id, newMsg)=>{
  setTask((prev)=>prev.map((e)=>{
    return  e.id === id? {...e, task : newMsg} : e}))
  }

   deleteTodo = (id)=>{
    setTask((prev) => prev.filter((e)=> e.id !== id))
  }

   taskComplete = (id)=>{ 
    setTask((prev)=>prev.map((e)=>{
    return e.id === id? {...e, complete: !e.complete} : e}))
  }


useEffect(()=>{
    const todo = JSON.parse(localStorage.getItem("neededTask"))
   if (todo && todo.length>0) {
    setTask(todo)
   }}, [])

useEffect(()=>{ 
  localStorage.setItem("neededTask", JSON.stringify(task))
   }, [task])


  return (
   <TodoProvider value={{Todo, addTodo, updateTodo,deleteTodo,taskComplete}}>
   <div
    className='w-[570px] h-auto p-8 mx-auto mt-48 bg-red-800 flex flex-wrap flex-col'>

    {/* task inserting section */}
      <section className='w-auto h-auto flex flex-wrap flex-row bg-blue-600 p-2'>
        
        <input type="text" 
        className='w-[360px] h-auto text-black pl-2 py-1 ml-2'
        value = {inputVal}
        onChange={
          (e)=>{setinputVal(e.target.value)}
          }
        />

        <button
        className='w-auto h-auto bg-black text-white ml-3 px-3 py-2'
        onClick={ (e)=>{ e.preventDefault;

          if(inputVal)
        {addTodo({task:inputVal, complete: false })
        setinputVal("")}
             }
         }>Addtask</button>

      </section>

      {/* task display section */}
      <section className='bg-green-600 mt-4'>
      {task.map((e)=>(
        <div key={e.id} className='w-full h-auto'>
          <TodoSect sendedTodo = {e}
          />
        </div>
      ))}
      
      </section>

   </div>
   </TodoProvider>
  )
}

export default App
