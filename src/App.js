import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);


function App() {
  let [contador, setContador] = useState(1)
  let [fechaIni, setFechaIni] = useState(undefined)
  let [fechaFin, setFechaFin] = useState(undefined)
  let [duracion, setDuracion] = useState(0)
  return (
    <div>

      <label>Inicio:<input type="date" onChange={(event) => { setFechaIni(event.target.valueAsDate.getTime()) }} /></label>
      <label>Fin:<input type="date" onChange={(event) => setFechaFin(event.target.valueAsDate.getTime())} /></label>
      <label>Duración:
        <input type="number" id="duracion" min="5" max="60" step="5" onChange={(event) => setDuracion(event.target.valueAsNumber)} />
      </label>

      <button onClick={() => setContador(++contador)}>
        +</button>

      <button onClick={() => setContador(--contador)}>
        -</button>

      <p>{fechaIni}</p>
      <p>{fechaFin}</p>

      {new Array(contador).fill(0).map(() =>
        <DaySelection duracion={duracion} inicio={fechaIni} fin={fechaFin} />)}
    </div>
  )
}

function DaySelection(props) {
  var days = ["lunes", "martes", "miercoles", "jueves", "viernes"]
  let [hIni, setHIni] = useState(undefined)
  let [hFin, setHFin] = useState(undefined)
  let [interval, setInterval] = useState(0)
  let [daySelected, setDaySelected] = useState("lunes")
  let horarios = []
  function conversion(m) {
    var tiempo = m / 60;
    var hour = Math.floor(tiempo)
    var min = (tiempo - hour) * 60
    return hour + ":" + min
  }


  return (
    <section id="daySelection">
      <label>Día:
          <select name="Combodays" onChange={(event) => setDaySelected(event.target.value)}>
          {days.map((day) => {
            return <option value={day}>{day}</option>
          })}</select>
      </label>
      <label >Desde:<input type="time" onChange={(event) => setHIni(event.target.valueAsDate.getTime() / 60000)} /></label>
      <label >Hasta:<input type="time" onChange={(event) => setHFin(event.target.valueAsDate.getTime() / 60000)} /></label>
      <button onClick={function GenerarCitas() {
        for (var i = props.inicio; i <= props.fin; i += 86400000) {
          var dia = new Date(i)
          if (dia.getDay() == days.indexOf(daySelected)) {
            console.log("Sí es el día")
            var d = { }
            d[dia.toString]=[]
            horarios.push(d)
            for (var m = hIni; m + props.duracion <= hFin; m += props.duracion) {
              var fi = conversion(m);
              var li = conversion(m + props.duracion)
              var intervalo = fi + "-" + li
              d[0].push(intervalo)
            }
          }
        }
        console.log(horarios)
      }}>aceptar</button>

    </section>
  )
}


// const initialState = { name: '', description: '' }

// const App = () => {
//   const [formState, setFormState] = useState(initialState)
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   function setInput(key, value) {
//     setFormState({ ...formState, [key]: value })
//   }

//   async function fetchTodos() {
//     try {
//       const todoData = await API.graphql(graphqlOperation(listTodos))
//       const todos = todoData.data.listTodos.items
//       setTodos(todos)
//     } catch (err) { console.log('error fetching todos') }
//   }

//   async function addTodo() {
//     try {
//       if (!formState.name || !formState.description) return
//       const todo = { ...formState }
//       setTodos([...todos, todo])
//       setFormState(initialState)
//       await API.graphql(graphqlOperation(createTodo, {input: todo}))
//     } catch (err) {
//       console.log('error creating todo:', err)
//     }
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Amplify Todos</h2>
//       <input
//         onChange={event => setInput('name', event.target.value)}
//         style={styles.input}
//         value={formState.name} 
//         placeholder="Name"
//       />
//       <input
//         onChange={event => setInput('description', event.target.value)}
//         style={styles.input}
//         value={formState.description}
//         placeholder="Description"
//       />
//       <button style={styles.button} onClick={addTodo}>Create Todo</button>
//       {
//         todos.map((todo, index) => (
//           <div key={todo.id ? todo.id : index} style={styles.todo}>
//             <p style={styles.todoName}>{todo.name}</p>
//             <p style={styles.todoDescription}>{todo.description}</p>
//           </div>
//         ))
//       }
//     </div>
//   )
// }

// const styles = {
//   container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   todoName: { fontSize: 20, fontWeight: 'bold' },
//   todoDescription: { marginBottom: 0 },
//   button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
// }

export default App