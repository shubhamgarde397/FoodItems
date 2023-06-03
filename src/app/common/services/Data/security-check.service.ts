import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCheckService {
  public gymid;
  public AUTH = false;
  public username;
  public dname;
  public userid;
  public username2;
  public role = 6;
  public typeofuser = 3;
  public amountShow=false;
  constructor() {
  }


  setUsername(username) {
    this.username = username;
  }

  setDisplayname(name){
    this.dname = name;
  }
  setUserid(_id){
    this.userid=_id;
  }
  setUserName(data){
    this.username2=data;
  }
  setGYMid(data){
    this.gymid=data;
  }

  setRole(role) {
    this.role = role;
  }

  setTypeOfUser(data) {
    this.typeofuser = data;
  }
  getTypeOfUser() {
    return this.typeofuser
  }

}
