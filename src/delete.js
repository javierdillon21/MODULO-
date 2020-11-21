import React, { isValidElement, useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function Color({ namecolor }) {
  var tabla = []
  var columna;
  namecolor.forEach((diaobj) => {
    for (let ) {
      columna = <div>
        <div>{dia}</div>
        <div>{diaobjdia][0]}</di}></div>
        
        <div>{diaobj[dia][1]}</div>
      </div>
      tabla.push(coluna) } }) }chaFin let [fechaIni, setFechaIni] = useState(undefined) let [fe function App() {
  let [fe, setFechaFin] = useState(undefined)
  IENDO isValidElement
  let [duracijn, setfkk] = useState(0) 1fechaFin function fiun(){
  flasjdlkfjasjd;flkjasd{}
} 
function Schedule(){
    var fila= columna;
    cuadritos=["tomates","cebollas","pimiento","pimiento"] 

}
aniiiiiiiiiiiiiiiiiiiiiiCHEVERE
a
ain


// hello
// ftherethetherethererelsadjfkljasdflkasjdfljasdlfjasd
hello
flsadjfkljasdflkasjdfljasdlfjasd

flkajsdlkfj lfkajsdklfj dasl hello flsadjfkljasdflkasjdfljasdlfjasd my frined kkkkkkkkkkkkkkkkk
 555555555     >Inicio:<input type="date" onChange={(event) => { setFechaIni(event.target.valueAsDate.getTime()event.target.valueAsDate.getTime()) }} /></label>


      <label>Fin:<input type="" onChange={(event) => setFechaFin(event.target.valueAsDate.getTime())} /></label>
      <label>Duración:
      </label>

      <butjjjjjjClick={() => fjakssssssssdlkjetContador(++contador)}>
       button onClick={() = +</button>
dwhjahwjdkhjahdjhajddhajkwhdhdjahwdjkhwwdjakhwhdakjhdanlllhjshsd fsee f 
      <button onClick={() => setContador(--contador)}>
        -</button> {new Array(contador).fill(0).map(() =>
        <DaySelection duracion={duracion} inicio={fechaIni} fin={fechaFin} horarios={horarios} />)}

      <button onClick={() => horarios.forEach(function calendario(fecha, index) {
        return <label> {fecha}  </label>
      })}>GENERAR CALENDARIO</button>

      <Color namecolor={mihorario} />
      {tabla}
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

// const styles = {
//   container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   todoName: { fontSize: 20, fontWeight: 'bold' },
//   todoDescription: { marginBottom: 0 },
//   button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
// }

export default App