import React, { useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listReservations } from './graphql/queries'
import { updateReservation } from './graphql/mutations'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);


function StudentInterface() {
    var [data, setData] = useState(undefined)

    async function MostrarReservas() {
        const DataReservations = await API.graphql(graphqlOperation(listReservations))
        const registros = DataReservations.data.listReservations.items
        registros.forEach((dataobj) => {
            var dia = dataobj.date
            var timesobj = JSON.parse(dataobj.timeFrames)
            var tabla = []
            var intervalos = Object.keys(timesobj).map((intervalo) => {
                return <div>{intervalo}</div>;
            });
            var columna = <div>
                <div>{dia}</div>
                <div>{intervalos}</div>
            </div>
            tabla.push(columna)
        }
        
            return <div id="tabla"> {tabla} </div>
        
    }


    // await API.graphql(graphqlOperation(updateReservation,{input:{} }))


    return (<div>
        <button onClick={async function () { MostrarReservas() }}>
            ok
        </button>
        {data}
    </div>)
}

export default StudentInterface