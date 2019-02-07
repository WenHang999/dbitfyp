import { Injectable } from "@angular/core";
import { Http,Headers,RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ShareService{

  url:string="https://fyp620190204125039.azurewebsites.net/api/";
  constructor(private http:Http){
  }
  login(user,pass){
    var _url=this.url+"ApiLogin";
    var _body ={"Email":user,"Password":pass};
    var _header = new Headers({'Content-Type':'Application/json'});
    var _option= new RequestOptions({method:RequestMethod.Post,headers:_header});
    return this.http.post(_url,_body,_option).map(res=>res.json());
  }
  getAll(){
    var url=this.url+"accounts";
    return this.http.get(url).map(res=>res.json());
  }
  Create(Email,Name,ContactNo,AccountType,Password){
    var url=this.url+"accounts";
    var body ={"email":Email,"name":Name,"contactNo":ContactNo,"password":Password,"accountType":AccountType};
    var header =new Headers({'Content-Type':'application/json'});
    var option = new RequestOptions({method:RequestMethod.Post,headers:header});
    return this.http.post(url,body,option).map(res=>res.json());
  }
  Update(id,Email,Name,ContactNo,AccountType,Password){
    var url = this.url+"accounts";
    var body ={"uid":id,"email":Email,"name":Name,"contactNo":ContactNo,"password":Password,"accountType":AccountType};
    var header =new Headers({'Content-Type':'application/json'});
    var option = new RequestOptions({method:RequestMethod.Put,headers:header});
    return this.http.put(url+"/"+id,body,option).map(res=>res.json());
  }
  Read(id){
    var url = this.url+"accounts";
    return this.http.get(url+"/"+id).map(res=>res.json());
  }
  Delete(id){
    var url = this.url+"accounts";
    return this.http.delete(url+"/"+id).map(res=>res.json());
  }

  activityCreate( eventName, eventTypes, startDate, endDate, quantity, description, location, publishTime, imgName, ballotOption,recurring) {
    console.log(startDate, endDate, description, quantity, eventName, publishTime, eventTypes, location, imgName, ballotOption,recurring);
    var url =  this.url+"eventTickets";
    var body = {
      "startDate": startDate, 
      "endDate": endDate, 
      "description": description,
      "quantity": quantity,  
      "eventname": eventName, 
      "publishTime": publishTime, 
       "eventType": eventTypes,
    "location": location,  
    "imageName": imgName,
    "ballotOption": ballotOption,  
    "recurring":recurring};
    var header = new Headers({ 'Content-Type': 'application/json' });
    var option = new RequestOptions({ method: RequestMethod.Post, headers: header });
    return this.http.post(url, body, option).map(res => res=>res.json());
  }
  updateActivity(eventCode, eventName, eventTypes, startDate, endDate, quantity, description, location, publishTime, imgName, ballotOption,recurring) {
    console.log(eventCode, startDate, endDate, description, quantity, eventName, publishTime, eventTypes, location, imgName, ballotOption,recurring);
    var url =  this.url+"eventTickets";
    var body = {
      "eventCode": eventCode, 
      "startDate": startDate, 
      "endDate": endDate, 
      "description": description,
      "quantity": quantity,  
      "eventname": eventName, 
      "publishTime": publishTime, 
       "eventType": eventTypes,
    "location": location,  
    "imageName": imgName,
    "ballotOption": ballotOption,  
    "recurring":recurring};
    var header =new Headers({'Content-Type':'application/json'});
    var option = new RequestOptions({method:RequestMethod.Put,headers:header});
    return this.http.put(url+"/"+eventCode,body,option).map(res=>res.json());
  }
  activityGetAll(){
    var url =  this.url+"eventTickets";
    return this.http.get(url).map(res=>res.json());
  }
  activityDel(id){
    var url = this.url+"eventTickets";
    return this.http.delete(url+"/"+id).map(res=>res.json());
  }

  bookingCreate(eventCode,uid,date,bookedDate){
    var url =  this.url+"bookings";
    var body ={"eventCode":eventCode,"uid":uid,"date":date,"bookedDate":bookedDate};
    var header =new Headers({'Content-Type':'application/json'});
    var option = new RequestOptions({method:RequestMethod.Post,headers:header});
    return this.http.post(url,body,option).map(res=>res.json());

  }

  // Booking table
  getBooking(){
    var url =  this.url+"bookings";
    return this.http.get(url).map(res=>res.json());

  }
  cancelBooking(id){
    var url =  this.url+"bookings";
    return this.http.delete(url+"/"+id).map(res=>res.json());
  }
  // Ballot Result Table
  CreateBallotResult(eventCode,uid,date,status){
    var url =  this.url+"ballotResults";
    var body ={"eventCode":eventCode,"uid":uid,"date":date,"status":status};
    var header =new Headers({'Content-Type':'application/json'});
    var option = new RequestOptions({method:RequestMethod.Post,headers:header});
    return this.http.post(url,body,option).map(res=>res.json());

  }
  getBallotResult(){
    var url =  this.url+"ballotResults";
    return this.http.get(url).map(res=>res.json());
  }

  //comment table

  CreateRating(eventCode,date,time,uid,comment,rating){
    var url =  this.url+"ratings";
    console.log(eventCode,date,time,uid,comment,rating);
    var body ={"eventCode":eventCode,"date":date,"time":time,"uid":uid,"comment":comment,"rating1":rating};
    var header =new Headers({'Content-Type':'application/json'});
    var option = new RequestOptions({method:RequestMethod.Post,headers:header});
    return this.http.post(url,body,option).map(res=>res.json());
  }
  
  DeleteRating(id){
    var url = this.url+"ratings";
    return this.http.delete(url+"/"+id).map(res=>res.json());
  }
  getRating(){
    var url = this.url+"ratings";
    return this.http.get(url).map(res=>res.json());
  }
}