import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { ShareService } from '../server/server';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage'
import { BookedDetailPage } from '../booked-detail/booked-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ShareService]
})
export class HomePage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  isToday: boolean = true;
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }
  EventData: any;
  uid: any;
  accountType: any;
  evType: any;
  constructor(public Storage: Storage, public share: ShareService, public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.CollectEventData();
    // get all the table from Database
    this.share.activityGetAll().subscribe(data => {
      this.Storage.set('EventTicketTable', data);
      this.evType = _.uniqBy(data, 'eventType');
    });
    this.share.getBallotResult().subscribe(data => {
      this.Storage.set('BallotTable', data);
    });
    this.share.getRating().subscribe(data => {
      this.Storage.set('RatingTable', data);
    });
    this.share.getBooking().subscribe(data => {
      this.Storage.set('BookingTable', data);
    });
    this.share.getAll().subscribe(data => {
      this.Storage.set('AccountTable', data);
    });
    this.Storage.get('loginUser').then((val) => {
      this.accountType = val.AccountType;
    })
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    this.navCtrl.push(BookedDetailPage, {
      eventData: event.eventData
    })
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  CollectEventData() {
    this.share.getBooking().subscribe(bookingdata => {
      this.share.activityGetAll().subscribe(Eventdata => {
        this.Storage.get('loginUser').then((val) => {
          if (val.AccountType == 'user') {
            var uid = val.UserID;
            // select * from bookingTable a, eventicket b where a.eventcode =b.evencode
            var combine = _.map(bookingdata, function (item) {
              return _.merge(item, _.find(Eventdata, { 'eventCode': parseInt(item.eventCode) }));
            });
            // filter by user id.
            var merged = _.filter(combine, ['uid', uid]);
            // push each event to eventSouce for display
            var events = [];
            for (var i = 0; i < merged.length; i++) {
              var mydate = moment(merged[i]['bookedDate']).add(1, 'days').toDate()
              if (merged[i]['ballotOption'] == "yes") {
                events.push({
                  title: merged[i]['eventname'],
                  startTime: mydate,
                  endTime: mydate,
                  allDay: true,
                  img: merged[i]['imageName'],
                  eventData: merged[i]
                });
              } else {
                events.push({
                  title: merged[i]['eventname'],
                  startTime: mydate,
                  endTime: mydate,
                  allDay: true,
                  img: merged[i]['imageName'],
                  eventData: merged[i]
                });
              }
            }
            console.log(events);
            this.eventSource = events;
          } else {
            this.share.getAll().subscribe(UserData => {
              var merged = _.map(bookingdata, function (item) {
                return _.merge(item, _.find(Eventdata, { 'eventCode': parseInt(item.eventCode) }));
              });
              merged = _.map(merged, function (item) {
                return _.merge(item, _.find(UserData, { 'uid': parseInt(item.uid) }));
              });
              console.log(merged);
              var events = [];
              for (var i = 0; i < merged.length; i++) {
                var mydate = moment(merged[i]['bookedDate']).add(1, 'days').toDate()
                if (merged[i]['ballotOption'] == "yes") {
                  events.push({
                    title: merged[i]['eventname'],
                    startTime: mydate,
                    endTime: mydate,
                    allDay: true,
                    img: merged[i]['imageName'],
                    eventData: merged[i],
                    userName: merged[i].name
                  });
                } else {
                  events.push({
                    title: merged[i]['eventname'],
                    startTime: mydate,
                    endTime: mydate,
                    allDay: true,
                    img: merged[i]['imageName'],
                    eventData: merged[i],
                    userName: merged[i].name
                  });
                }
              }
              this.eventSource = events;
            })
          }
        });
      });
    });
  }

  togglePage(evType) {
    // if is admin, show all event with 'current' or 'expired' tag. 
    this.share.getBooking().subscribe(bookingdata => {
      this.share.activityGetAll().subscribe(Eventdata => {
        this.share.getAll().subscribe(UserData => {
          var merged = _.map(bookingdata, function (item) {
            return _.merge(item, _.find(Eventdata, { 'eventCode': parseInt(item.eventCode) }));
          });
          merged = _.map(merged, function (item) {
            return _.merge(item, _.find(UserData, { 'uid': parseInt(item.uid) }));
          });
          merged = _.filter(merged, ['eventType', evType]);
          console.log(merged);
          var events = [];
          for (var i = 0; i < merged.length; i++) {
            var mydate = moment(merged[i]['bookedDate']).add(1, 'days').toDate()
            if (merged[i]['ballotOption'] == "yes") {
              events.push({
                title: merged[i]['eventname'],
                startTime: mydate,
                endTime: mydate,
                allDay: true,
                img: merged[i]['imageName'],
                eventData: merged[i],
                userName: merged[i].name
              });
            } else {
              events.push({
                title: merged[i]['eventname'],
                startTime: mydate,
                endTime: mydate,
                allDay: true,
                img: merged[i]['imageName'],
                eventData: merged[i],
                userName: merged[i].name
              });
            }
          }
          this.eventSource = events;
        })
      })
    })
  }
}
