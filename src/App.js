import React, { useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createReservation } from './graphql/mutations'
import { createPractice } from './graphql/mutations'
import './App.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);


const modeloReserva = { date: '', timeFrame: '', contextID: '', userID: '' }
function MostrarReservas({ horarios }) {
  var tabla = []
  var columna;
  horarios.forEach((diaobj) => {
    for (var dia in diaobj) {
      var intervalos = diaobj[dia].map((intervalo) => {
        return <div>{intervalo}</div>;
      });
      columna = <div>
        <div>{dia}</div>
        <div>{intervalos}</div>
      </div>
      tabla.push(columna)
    }
  })
  return <div id="tabla">{tabla}</div>;
}

function App() {
  let [contador, setContador] = useState(1)
  let [fechaIni, setFechaIni] = useState(undefined)
  let [fechaFin, setFechaFin] = useState(undefined)
  let [duracion, setDuracion] = useState(0)
  let [horarios, setHorarios] = useState([])
  let [calendario, setCalendario] = useState(undefined)
  var [reservation, setReservation] = useState(modeloReserva)

  //función para añadir una reserva a la BD
  async function addReservation() {
    const reserva = { ...reservation }
    horarios.forEach((diaobj) => {
      var contador = 0;
      for (dia in diaobj) {
        setReservation({ ...modeloReserva, [date]: dia, [timeFrame]: diaobj[dia][contador] })
      }
    })

    await API.graphql(graphqlOperation(createReservation, { input: reservation }))
  }

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

      {new Array(contador).fill(0).map(() =>
        <DaySelection duracion={duracion} inicio={fechaIni} fin={fechaFin} horarios={horarios} />)}

      <button onClick={() => {
        setCalendario(<MostrarReservas horarios={horarios} />);
        addReservation();
      }}>MOSTRAR CALENDARIO</button>

      {calendario}
    </div>

  )
}

function DaySelection(props) {
  var days = ["lunes", "martes", "miercoles", "jueves", "viernes"]
  let [hIni, setHIni] = useState(undefined)
  let [hFin, setHFin] = useState(undefined)
  let [daySelected, setDaySelected] = useState("lunes")
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
            dia = dia.toUTCString()
            var d = {}
            d[dia] = []
            for (var m = hIni; m + props.duracion <= hFin; m += props.duracion) {
              var fi = conversion(m);
              var li = conversion(m + props.duracion)
              var intervalo = fi + "-" + li
              d[dia].push(intervalo)
            }
            props.horarios.push(d)
          }
        }
        console.log(props.horarios)
      }}>ACEPTAR</button>

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

export default App