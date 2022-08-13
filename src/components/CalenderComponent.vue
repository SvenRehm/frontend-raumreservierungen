<template>
   <div class="wrap">
      <div class="left">
         <DayPilotNavigator id="nav" :config="navigatorConfig" ref="navigator" />
      </div>
      <div class="content">
         <DayPilotCalendar id="dp" :config="calendarConfig" ref="calendar" />
      </div>
   </div>
</template>

<script>
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-vue'

export default {
   name: 'ResourceCalendar',
   data: function () {
      return {
         navigatorConfig: {
            showMonths: 3,
            skipMonths: 3,
            selectMode: "Day",
            startDate: "2022-08-01",
            selectionDay: "2022-08-01",
            onTimeRangeSelected: args => {
               this.calendarConfig.startDate = args.day;
            }
         },
         calendarConfig: {
            viewType: "Resources",
            startDate: "2022-08-01",
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: async (args) => {
               await this.createEvent(args.start, args.end, args.resource);
               this.calendar.clearSelection();
            },
            onEventClick: (args) => {
               this.editEvent(args.e);
            },
            eventDeleteHandling: "Disabled",
            onEventMoved: (args) => {
               console.log("Event moved", args.e);
            },
            onEventResized: (args) => {
               console.log("Event resized", args.e);
            },
         },
      }
   },
   props: {
   },
   components: {
      DayPilotCalendar,
      DayPilotNavigator
   },
   computed: {

      calendar() {
         return this.$refs.calendar.control;
      },
      navigator() {
         return this.$refs.navigator.control;
      }
   },
   methods: {
      loadEvents() {
         // placeholder for an HTTP call
         const events = [
            {
               id: 1,
               start: "2022-08-01T10:00:00",
               end: "2022-08-01T11:00:00",
               resource: "R3",
               text: "Event 1",
               barColor: "#6aa84f",
            },
            {
               id: 2,
               start: "2022-08-01T13:00:00",
               end: "2022-08-01T16:00:00",
               resource: "R3",
               text: "Event 2",
               barColor: "#f1c232",
            },
            {
               id: 3,
               start: "2022-08-01T13:30:00",
               end: "2022-08-01T16:30:00",
               resource: "R2",
               text: "Event 3",
               barColor: "#cc4125",
            },
            {
               id: 4,
               start: "2022-08-01T10:30:00",
               end: "2022-08-01T12:30:00",
               resource: "R2",
               text: "Event 4",
            },
            {
               id: 5,
               start: "2022-08-10T10:30:00",
               end: "2022-08-10T12:30:00",
               resource: "R2",
               text: "Event 5",
            },
            {
               id: 6,
               start: "2022-08-18T10:30:00",
               end: "2022-08-18T12:30:00",
               resource: "R2",
               text: "Event 6",
            },
            {
               id: 7,
               start: "2022-08-19T10:30:00",
               end: "2022-08-19T12:30:00",
               resource: "R2",
               text: "Event 7",
            },
         ];
         this.calendar.update({ events });
         this.navigator.update({ events });
      },
      loadResources() {
         const columns = [
            { name: "Resource 1", id: "R1" },
            { name: "Resource 2", id: "R2" },
            { name: "Resource 3", id: "R3" },
            { name: "Resource 4", id: "R4" },
            { name: "Resource 5", id: "R5" },
            { name: "Resource 6", id: "R6" },
         ];
         this.calendar.update({ columns });
      },
      async editEvent(e) {
         const form = [
            { name: "Text", id: "text" },
            { name: "Start", id: "start", type: "datetime", disabled: true },
            { name: "End", id: "end", type: "datetime", disabled: true },
            { name: "Resource", id: "resource", type: "select", options: this.calendar.columns.list }
         ];
         const data = e.data;
         const modal = await DayPilot.Modal.form(form, data);
         if (modal.canceled) {
            return;
         }

         this.calendar.events.update(modal.result);

      },
      async createEvent(start, end, resource) {
         const form = [
            { name: "Text", id: "text" },
            { name: "Start", id: "start", type: "datetime", disabled: true },
            { name: "End", id: "end", type: "datetime", disabled: true },
            { name: "Resource", id: "resource", type: "select", options: this.calendar.columns.list }
         ];
         const data = {
            start,
            end,
            resource,
            id: DayPilot.guid()
         };
         const modal = await DayPilot.Modal.form(form, data);
         if (modal.canceled) {
            return;
         }

         const e = modal.result;
         this.calendar.events.add(e);
      }
   },
   mounted() {
      this.loadResources();
      this.loadEvents();
   }
}
</script>

<style>
.wrap {
   display: flex;
}

.left {
   margin-right: 10px;
}

.content {
   flex-grow: 1;
}

.navigator_default_busy.navigator_default_cell {
   border-bottom: 4px solid #ee4f2ecc;
   box-sizing: border-box;
}
</style>
