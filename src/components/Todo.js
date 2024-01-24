import React, { useEffect,useState } from 'react'

function Todo() {
    const [todo,setTodo]=useState([]);

    useEffect(function(){

         const getTodos = async () => {
      try {
        const response = await fetch('todos.json');
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.log("Error fetching todos", error);
      }
    };

    getTodos();
  }, []);

    
  return (
    <div>
    {todo.map(function (value,index){
        return(
            <div key={index}>
            <p> userId: {value.userId}</p>
            <p>Id: {value.id}</p>
            <p>Title: {value.title}</p>
           
            </div>
        )
    })};
    </div>
  )
}

export default Todo