import React, {useState} from 'react'
import {Bell, CalendarDay, Clock, Palette, X} from 'react-bootstrap-icons'
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const TodoForm = ({toggleModal}) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState(new Date())
  const [time, setTime] = useState(new Date())


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='todoform'>
        <form>
          <div className="text">
            <h3>Add new To do!</h3>
            <input 
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='To do....'
            autoFocus
            />
          </div>
          <div className="remind">
            <Bell/>
            <p>Remind Me!</p>
          </div>
        </form>

        <div className="pick-day">
          <div className="title">
            <CalendarDay/>
            <p>Choose a day</p>    
          </div>
          <DatePicker
            value={day}
            onChange={day=>setDay(day)}
          />
        </div>

        <div className="pick-time">
          <div className="title">
            <Clock/>
            <p>Choose a time</p>    
          </div>
         <TimePicker
          value={time}
          onChange={time=>setTime(time)}
         />
        </div>

        <div className="pick-project">
          <div className="title">
              <Palette/>
              <p>Choose a project</p>    
          </div>
          <div className="projects">
            <div className="project active">
              personal
            </div>
            <div className="project">
              work
            </div>
          </div>
        </div>

        <div className="cancel" onClick={() => toggleModal()}>
          <X size='40'/>
        </div>
        <div className="confirm">
          <button> + Add to do</button>
        </div>
      </div>
  </LocalizationProvider>
  )
}

export default TodoForm