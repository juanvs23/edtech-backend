const fs = require('fs')

const { addWeeks } = require('date-fns')
const { google } = require('googleapis')

const credentials = require('../config/calendar-344620-4b81c363a9f5.json')



const scopes = ['https://www.googleapis.com/auth/calendar']

const client = google.auth.getClient({
    credentials,
    scopes,
  })

 client.subject = 'juanvs23@gmail.com'

  const calendar = google.calendar({ version: 'v3', auth: client })

  calendar.events.list({
    calendarId: 'calendar-344620',
    timeMin: new Date().toISOString(),
    timeMax: addWeeks(new Date(), 1).toISOString(), // Let's get events for one week
    singleEvents: true,
    orderBy: 'startTime',
    
  }, (err, res) => {
    if (err) {
      console.log(`The API returned an error: ${err}`)
    }
    console.log(res)
   /*   console.log(res.data.items) // All data
    const appointments = res.data.items.map((appointment) => ({
      start: appointment.start.dateTime || appointment.start.date,
      end: appointment.end.dateTime || appointment.end.date,
      id: appointment.id,
      status: appointment.status,
      creator: appointment.creator,
      description: appointment.description,
    }))
    console.log(appointments) */
  },)

  module.exports = calendar


