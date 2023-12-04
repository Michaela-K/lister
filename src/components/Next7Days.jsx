import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Todo from './Todo'

const Next7Days = ({todos}) => {
  const [weekTodos, setWeekTodos] = useState([])

  useEffect(() => {
      const days = ['0', '1', '2', '3', '4', '5', '6']

      const sortedTodosByDay = days.map(day => {
          return { //filter todos by day and return an object
              todos: todos.filter(todo => todo.day === day),
              number: day
          }  //result will be Eg. {[], 2}
      })

      const today = parseInt(moment().format('d'))  //parseInt used to make it into a number
      console.log(today)
      //arrange it by todays date
      const arrangeDays = sortedTodosByDay.slice(today).concat(sortedTodosByDay.slice(0, today))

      setWeekTodos(arrangeDays)
  }, [todos])

  return (
      <div className='next7Days'>
          {
              weekTodos.map(day =>
                  <div key={day.number}>
                      <div className='day'>
                          <div className='name'>
                              {moment(day.number, 'd').format('dddd')}
                              {day.number === moment().format('d') && ' (Today)'}
                          </div>
                          <div className='total-todos'>
                              ({day.todos.length})
                          </div>
                      </div>
                      <div className='next-todos'>
                          {
                              day.todos.map(todo =>
                                  <Todo key={todo.id} todo={todo} />
                              )
                          }
                      </div>
                  </div>

              )
          }
      </div>
  )
}

export default Next7Days