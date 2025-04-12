import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer";

// const initialState = [];

    
// Es la tercera funcion que se manda al reducer. No necesariamente se tiene que llamar init
const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || [];    // parce es lo opuesto al stringify
}

export const useTodo = ( ) => {

    const [ todos , dispatch] = useReducer(todoReducer, [], init)  //Aca esta el reducer son los 'todos'

    
    const handNewTodo = (todo) => {
        // Esta accion se envia al todoReducer.js
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action )       //El dispatch es la funcion usada para mandar los TODO(agregar a la 'lista')
    }


    useEffect(() => {
        // No se pueden guardar en el localStora objetos, unicamente string entonces se tienen que serializar
        localStorage.setItem('todos', JSON.stringify( todos ))   //No se importa porque ya es un API
    }, [todos])



    // Aca empieza. Se envia al TodoList
    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }


    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }

  return {
    todos,
    handNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo => !todo.done).length
,
  }
}
