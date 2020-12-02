import React, { useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listReservations } from './graphql/queries'
import { updateReservation } from './graphql/mutations'
import './App.css';


import awsExports from "./aws-exports";
Amplify.configure(awsExports);

//Función que lee la BD y muestra el calendario de reservas
async function MostrarReservas() {
    const DataReservations = await API.graphql(graphqlOperation(listReservations))
    const registros = DataReservations.data.listReservations.items
    var tabla = []
    registros.forEach((dataobj) => {
        var dia = dataobj.date
        var timesobj = JSON.parse(dataobj.timeFrames)
        var intervalos = Object.keys(timesobj).map((intervalo) => {
            return <div className="intervalo" onClick={() => {
                //asignando 'reservado' al clickear un horario. Debe asignarse el id del usurario
                timesobj[intervalo] = "reservado"
                console.log(timesobj)
                // //actualizando la tabla reservation con los horarios reservados
                // await API.graphql(graphqlOperation(updateReservation, { input: { date: dia, timeFrames: timesobj } }))
            }}>{intervalo}</div>
        });
        var columna = <div>
            <div>{dia}</div>
            <div>{intervalos}</div>
        </div>
        tabla.push(columna)
    })
    return <div id="tabla">
        {tabla}
    </div>
}



//función principal 'Interface del estudiante'
function StudentInterface() {
    var [calendario, setCalendario] = useState(undefined)
    return (<div>
        <button onClick={async () => setCalendario(await MostrarReservas())}>
            ok
        </button>
        {calendario}
    </div>)
}
export default StudentInterface