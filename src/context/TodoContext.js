import React, { createContext, useContext } from "react";

 export const TodoContext = createContext( 
   { 
    Todo: [{
    id: "random",
    task : 'task',
    complete : false}], 
    
    addTodo : (Todo)=>{},
    updateTodo : (Todo, id)=>{},
    deleteTodo : (id)=>{},
    taskComplete : (id)=>{}
    }
 )

export function useTodo(){ 
    return (
        useContext(TodoContext)
    ) }

export const TodoProvider = TodoContext.Provider


