import React from "react"
import c from "calendar"
import _ from "lodash"

export default class Calendar extends React.Component {
  generateCalendar = () => {
    const events = this.props.events
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    var cal = new c.Calendar()
    var m = cal.monthDays(year, month)
    const calendarData = []
    m.forEach(element => {
      const days = []
      element.forEach(day => {
        let eventDisplay = ""
        const todaysEvent = events.filter(event => {
          return event.date.substring(8, 10) == day
        })

        if (todaysEvent) {
          todaysEvent.map(event => {
            if (event.name) {
              return (eventDisplay += event.name + " ")
            } else if (event.count) {
              return (eventDisplay += event.count + " ")
            }
          })
        }

        days.push({
          date: day,
          data: eventDisplay,
        })
      })
      calendarData.push(days)
    })

    // console.log("Calendar", calendarData)
    return calendarData
  }

  render() {
    const monthView = this.generateCalendar()

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <div>
              <table>
                <thead className="calendar-head">
                  <tr>
                    <th className="calendar-day-header text-danger">
                      <span>Sun</span>
                    </th>
                    <th className="calendar-day-header">
                      <span>Mon</span>
                    </th>
                    <th className="calendar-day-header">
                      <span>Tue</span>
                    </th>
                    <th className="calendar-day-header">
                      <span>Wed</span>
                    </th>
                    <th className="calendar-day-header">
                      <span>Thu</span>
                    </th>
                    <th className="calendar-day-header">
                      <span>Fri</span>
                    </th>
                    <th className="calendar-day-header">
                      <span>Sat</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="fc-body">
                  {monthView.map((week, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          {week.map((day, key) => {
                            if (day.date > 0) {
                              return (
                                <td key={key} className="calendar-day">
                                  {day.date}
                                </td>
                              )
                            } else {
                              return (
                                <td key={key} className="calendar-day"></td>
                              )
                            }
                          })}
                        </tr>
                        <tr>
                          {week.map((day, key) => {
                            if (day.date > 0 && day.data !== "") {
                              return (
                                <td key={key}>
                                  <small className="calendar-day-appt">
                                    {day.data}
                                  </small>
                                </td>
                              )
                            } else {
                              return <td key={key}></td>
                            }
                          })}
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
