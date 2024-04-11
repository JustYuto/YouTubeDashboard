<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import axios from 'axios';


export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventAdd: this.handleEventAdd,
        eventChange: this.handleEventChange,
        eventRemove: this.handleEventRemove,
      },
      currentEvents: [],
    }
  },
  methods: {
    handleEventAdd(addInfo) {
      const event = {
        title: addInfo.event.title,
        start: addInfo.event.start,
        end: addInfo.event.end || addInfo.event.start, // Some events might not have an explicit end time
        allDay: addInfo.event.allDay,
      };

      axios.post('http://localhost:3000/api/calendar/events', event)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error('Error adding event:', error);
          // Optionally, revert adding the event locally if the remote add fails
        });
    },
    handleEventChange(changeInfo) {
      const event = {
        title: changeInfo.event.title,
        start: changeInfo.event.start,
        end: changeInfo.event.end || changeInfo.event.start, // Handle case where end might be undefined
        allDay: changeInfo.event.allDay,
      };

      axios.put(`http://localhost:3000/api/calendar/events/${changeInfo.event.id}`, event)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error('Error updating event:', error);
          // Optionally, revert the event changes locally if the remote update fails
        });
    },
    handleEventRemove(removeInfo) {
      axios.delete(`http://localhost:3000/api/calendar/events/${removeInfo.event.id}`)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error('Error removing event:', error);
          // Optionally, revert the event removal locally if the remote deletion fails
        });
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    fetchEvents() {
      axios.get('http://localhost:3000/api/calendar/events')
        .then(response => {
          const events = response.data.map(event => ({
            id: event._id, // Assuming your database uses _id for the unique identifier
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay
          }));
          this.calendarOptions.events = events;
          this.currentEvents = events; // Update currentEvents with the fetched events
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    },

    handleEvents(events) {
      this.currentEvents = events; // Keep currentEvents up-to-date with the calendar's events
    },
  },
  // When the component is created, fetch events from the server
  created() {
    this.fetchEvents();
  }
})

</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

th.fc-col-header-cell {
  padding: 18px;
}

.fc-theme-standard td,
.fc-theme-standard th,
.fc-theme-standard .fc-scrollgrid {
  border: none;
}

.fc-theme-standard .fc-scrollgrid {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  /* border-left: 1px solid rgba(255, 255, 255, 0.1); */
}

.fc-theme-standard td,
.fc-theme-standard th {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.fc-theme-standard th {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: none;
  border-left: none;
}

td {
  border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
}

a.fc-col-header-cell-cushion {
  color: rgba(255, 255, 255, 0.3);
}

.fc-daygrid-day-top {
  font-size: 13px;
  columns: rgba(255, 255, 255, 0.7);
  font-family: "Space Grotesk";
  font-weight: 700;
}
</style>