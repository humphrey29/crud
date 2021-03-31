import React, {useState, useEffect} from 'react'
import { isEmpty,size } from 'lodash'
import shortid from 'shortid'
import { addDocument, getCollection, updateDocument } from './actions'


function App() {
  const [task, setTask] =useState("")  
  const [tasks, setTasks]=useState([])
  const [editmode, setEditMode]=useState(false)
  const [id, setId] =useState("")
  const [error, setError]=useState(null)

  useEffect(() =>{
    (async () => {
      const result = await getCollection("tasks")
      if (result.statusResponse){
        setTasks(result.data)
      }
      
    })()
  },[])
  

const validForm = () => {
  let isValid=true
  setError(null)

  if(isEmpty(task))
  {
    setError("Debes Ingresar una tarea.")
    isValid=false
  }
  return isValid
}

  const addTask = async (e) => {
      e.preventDefault()
     
        if(!validForm()) {
          return
        }

        const result = await addDocument("tasks", { name: task })
        if(!result.statusResponse)
        {
            setError(result.error)
            return 
        }
     

      setTasks([...tasks, {id:result.data.id, name:task}])

        setTask("")


  }

  const deleteTask = (id) => {
    const filteredTask = tasks.filter(task => task.id !== id)
    setTasks(filteredTask)
  }
 
   const editTask = (theTask) => {
      setTask(theTask.name)  
      setEditMode(true)
      setId(theTask.id)


   }

   const savedTask = async (e) => {
    e.preventDefault()
    if(!validForm()) {
      return
    }
    
    const result = await updateDocument("tasks",id,{name:task})

    if (!result.statusResponse)
    {
      setError(result.error)
      return 
    }

    const editedTasks = tasks.map(item => item.id === id ? {id,name:task}:item)
    setTasks(editedTasks)
    //limpiar valores
    setEditMode(false)
    setTask("")
    setId("")
    


}


  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>

      <div className="row">
        <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
          {
              size(tasks) == 0 ? (
                   <li className="list-group-item">Aun no hay Tareas Programadas</li>

              ):
            (


              <ul className="list-group">
                  {
                    tasks.map((task)=> (
                        <li className="list-group-item" key={task.id} >
                        <span className="lead">{task.name}</span>
                        <button  
                        className="btn btn-danger btn-sm float-right mx-2"
                        onClick={() => deleteTask(task.id)}
                        >
                          Eliminar
                          </button>
                        <button 
                        className="btn btn-warning btn-sm float-right"
                        onClick={() =>  editTask(task)}
                        

                        >
                          Editar
                          </button>
                    </li>

                    ))
                    
                  }
              </ul>
            )
          }
        </div>
        <div className="col-4">
        <h4 className="text-center">
          { editmode ? "Modificar Tarea" :"Agregar Tarea"}
        </h4>
        <form onSubmit={editmode ? savedTask : addTask}>
        {
            error && <span className="text-danger">{error}</span>
          }
          <input 
            type="text"
            className="form-control mb-2" 
            placeholder="Ingrese la tarea"
            onChange={(text) =>setTask(text.target.value)}
            value={task}
            >
          </input>

     
          <button className="{ editmode ? btn btn-warning :  btn btn-dark btn-block"
          type="submit"

          >{editmode ? "Grabar" : "Agregar"}</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
