import React from 'react'
import TeacherInterface from './Teachers'
import StudentInterface from './Students'


let user = "student"

function Test() {
    return (<div> {(user === "teacher") && <TeacherInterface />}
        {(user === "student") && < StudentInterface />} </div >)
}
export default Test