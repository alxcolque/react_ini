import React, {Fragment, useState, useRef, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import { TodoList } from "./components/TodoList";

const KEY = "todoApp.todos";

export function App(){
    const todoTaskRef = useRef();
    const [todos, setTodos] = useState([
        {id:1,task:"task 1", completed: false},
    ]);

    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos);
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);

    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=> todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = (event)=>{
        const task = todoTaskRef.current.value;
        if(task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed: false}];
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }
    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo = {toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
            <button onClick={handleTodoAdd}>+</button>
            <button onClick={handleClearAll}>x</button>
            <div>Te quedan {todos.filter((todo)=> !todo.completed).length} tareas por terminar</div>
        </Fragment>
    );
}