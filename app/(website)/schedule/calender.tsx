"use client";

import React from 'react'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { DateActivity } from '@/lib/definitions';

const Calender = () => {
  const calendar = useNextCalendarApp({
    views: [ 
      createViewWeek(), 
      createViewMonthGrid(), 
      createViewMonthAgenda()
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-09-01',
        end: '2024-09-04',
      },
    ],
    selectedDate: '2024-09-03'
  })

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default Calender