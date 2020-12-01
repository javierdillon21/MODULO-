import React, { useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createReservation } from './graphql/mutations'
import { createTimeFrame } from './graphql/mutations'
import { createPractice } from './graphql/mutations'
import './App.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);



function TeacherInterface() {
  let [contador, setContador] = useState(1)
  let [fechaIni, setFechaIni] = useState(undefined)
  let [fechaFin, setFechaFin] = useState(undefined)
  let [duracion, setDuracion] = useState(0)
  let [horarios, setHorarios] = useState([])
  let [calendario, setCalendario] = useState(undefined)

  //función para añadir una reserva a la BD
  async function addReservation() {

    horarios.forEach(async function (diaobj) {
      for (var dia in diaobj) {
        var timesArray = {}
        diaobj[dia].forEach((time)=>{
          timesArray[time] = ''
        })
        var reservation = { date: dia, timeFrames: timesArray, contextID: ''}
        await API.graphql(graphqlOperation(createReservation, { input: reservation }))
      }
    })
  }

  //función para añadir una práctica a la BD
  async function addPractice() {
    var practice = { quota: String.toString(duracion), lab: '' }
    await API.graphql(graphqlOperation(createPractice, { input: practice }))
  }

  return (
    <div> <label>Inicio:<input type="date" onChange={(event) => { setFechaIni(event.target.valueAsDate.getTime()) }} /></label>
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
        addPractice();
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

  //función para convertir una cantidad de minutos en formato 24horas
  function conversion(m) {
    var tiempo = m / 60;
    var hour = Math.floor(tiempo)
    var min = Math.round((tiempo - hour) * 60)
    if (min.toString().length == 1) min = min.toString() + "0"
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
            dia = dia.getUTCDate() + '-' + (dia.getUTCMonth() + 1) + '-' + dia.getFullYear()
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


export default TeacherInterface