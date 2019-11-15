import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private plt:Platform,private localNotifications : LocalNotifications, private alertCtrl: AlertController){
   this.plt.ready().then(()=>{
    this.localNotifications.on('click').subscribe(res=>{
      let msg = res.data ? res.data.mydata: '';
      this.showAlert(res.title,res.text,msg);
    });
    this.localNotifications.on('trigger').subscribe(res=>{
      let msg = res.data ? res.data.mydata: '';
      this.showAlert(res.title,res.text,msg);
    
    });
   })
  }
  scheduled =[];
  applyNotification()
  {
    this.localNotifications.schedule({
      id : 1,
      title: 'Notification est activée',
      text: 'Crée par Reminder',
      icon:'http://www.myiconfinder.com/uploads/iconsets/4d0e5b9f9bc31c22ccb0deccd4b9b625.png',
      data: {mydata :'user has clicked'},
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND }
    });

  }
  minuteNotification()
  {this.localNotifications.schedule({
    id : 22,
    title: 'Nouvelle notification',
    text: 'Tous les minutes',
    icon:'http://www.myiconfinder.com/uploads/iconsets/4d0e5b9f9bc31c22ccb0deccd4b9b625.png',
    //data: {mydata :'user has clicked'},
    trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
  });

  }
  dailyNotification()
  {
    this.localNotifications.schedule({
      id : 25,
      title: 'Daily Notification',
      text: 'Tous les jours',
      icon:'http://www.myiconfinder.com/uploads/iconsets/4d0e5b9f9bc31c22ccb0deccd4b9b625.png',
      //data: {mydata :'user has clicked'},
      trigger: { every: ELocalNotificationTriggerUnit.DAY }
    });
  }
  getAll()
  {
    this.localNotifications.getAll().then(res=> {
      this.scheduled = res;
    })
  }
  showAlert(header,sub,msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message : msg,
      buttons: ['Ok']
    }).then(alert=> alert.present());
  }
}
