import { Injectable } from '@angular/core';
import { Consts } from '../../constants/const';
import { SecurityCheckService } from '../Data/security-check.service';
@Injectable({
  providedIn: 'root'
})
export class HandleDataService {
 
  public Data;
  public flag = false;
  public hugeData=[]
  public IP = [];
  public turnData = [];
  public BHData = [];
  public PPData=[];
  public PaymentData=[]
  public updateTurnData=false;
  public users
  public arr=[];
  constructor(public securityCheck: SecurityCheckService) { }

  saveLRStatus(data){
    
    this.arr=data;
  }

  getLRStatus(){
    return this.arr;
  }
  setUsers(data){
    this.users=[];
    this.users=data;

  }
  getUsers(){
    return this.users;
  }

  saveData(data) {
    this.Data = data;
  }
  giveBHData(){
    return this.Data;
  }

  saveTurn(data) {
    this.turnData = data;
  }

  giveTurn() { return this.turnData; }
}