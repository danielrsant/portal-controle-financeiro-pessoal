// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Observable, Subject } from 'rxjs';
// import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';

// @Injectable()
// export class CalendarService implements Resolve<any>
// {
//     events: any;
//     onEventsUpdated: Subject<any>;

//     /**
//      * Constructor
//      *
//      * @param {HttpClient} _httpClient
//      */
//     constructor(
//         private _httpClient: HttpClient
//     )
//     {
//         // Set the defaults
//         this.onEventsUpdated = new Subject();
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Resolver
//      *
//      * @param {ActivatedRouteSnapshot} route
//      * @param {RouterStateSnapshot} state
//      * @returns {Observable<any> | Promise<any> | any}
//      */
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
//     {
//         this.getEvents();
//     }


//     getEvents() {

//         this.events = [
//             {
//                 id  : 'events',
//                 data: [
//                     {
//                         start    : subDays(startOfDay(new Date()), 1),
//                         end      : addDays(new Date(), 1),
//                         title    : 'A 3 day event',
//                         allDay   : true,
//                         color    : {
//                             primary  : '#F44336',
//                             secondary: '#FFCDD2'
//                         },
//                         resizable: {
//                             beforeStart: true,
//                             afterEnd   : true
//                         },
//                         draggable: true,
//                         meta     : {
//                             location: 'Los Angeles',
//                             notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
//                         }
//                     },
//                     {
//                         start    : startOfDay(new Date()),
//                         title    : 'An event with no end date',
//                         allDay   : false,
//                         color    : {
//                             primary  : '#FF9800',
//                             secondary: '#FFE0B2'
//                         },
//                         resizable: {
//                             beforeStart: true,
//                             afterEnd   : true
//                         },
//                         draggable: true,
//                         meta     : {
//                             location: 'Los Angeles',
//                             notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
//                         }
//                     },
//                     {
//                         start    : subDays(endOfMonth(new Date()), 3),
//                         end      : addDays(endOfMonth(new Date()), 3),
//                         title    : 'A long event that spans 2 months',
//                         allDay   : false,
//                         color    : {
//                             primary  : '#1E90FF',
//                             secondary: '#D1E8FF'
//                         },
//                         resizable: {
//                             beforeStart: true,
//                             afterEnd   : true
//                         },
//                         draggable: true,
//                         meta     : {
//                             location: 'Los Angeles',
//                             notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
//                         }
//                     },
//                     {
//                         start    : addHours(startOfDay(new Date()), 2),
//                         end      : new Date(),
//                         title    : 'A draggable and resizable event',
//                         allDay   : false,
//                         color    : {
//                             primary  : '#673AB7',
//                             secondary: '#D1C4E9'
//                         },
//                         resizable: {
//                             beforeStart: true,
//                             afterEnd   : true
//                         },
//                         draggable: true,
//                         meta     : {
//                             location: 'Los Angeles',
//                             notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
//                         }
//                     }
//                 ]
//             }
//         ];
//     }


//     updateEvents(events): Promise<any>
//     {
//         return new Promise((resolve, reject) => {
//             this._httpClient.post('api/calendar/events', {
//                 id  : 'events',
//                 data: [...events]
//             })
//                 .subscribe((response: any) => {
//                     this.getEvents();
//                 }, reject);
//         });
//     }

// }
