import React from 'react'
import { CalendarDate, CaretUp } from 'react-bootstrap-icons'

const Calendar = () => {
  const calendarItems = ['today', 'next 7 days', 'all days']
  
  return (
    <div className='calendar'>
      <div className="header">
        <div className="title">
          <CalendarDate size="18"/>
           <p>Calendar</p>
        </div>
                {/* <animated.div
                    style={spin}
                    onClick={() => setShowMenu(!showMenu)}
                    className="btns"
                > */}
                <div className="btns">
                    <span>
                        <CaretUp size="20" />
                    </span>
                </div>
                {/* </animated.div> */}
      </div>
        {calendarItems.map( item => 
          <div className="items" key={item} 
          // onClick={() => setSelectedProject(item)}
          >
            {item}
          </div>
        )}
    </div>
  )
}

export default Calendar