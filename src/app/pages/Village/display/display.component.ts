import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [ApiCallsService]
})
export class DisplayComponent implements OnInit {
  example: any;
  public villageslist;
  public show = false;
  public editData={};
  public village_name='';
  public diesel = 0;
  
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService,
    public sec: SecurityCheckService
  ) { }
 
  deleteVillageDetails = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['code'] = 'v';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: any) => {
          alert(response.Status)
          this.villageslist=[];
          alert('Please Refresh!')
        });
    }
  };

  ngOnInit() {
    this.villageslist=this.sec.commonArray['places'];
  }

  getInformationData() {
    let value={}
    value['method'] = 'getallplaces';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.villageslist=res.Data;
        this.sec.commonArray['places'] = res.Data.length > 0 ? res.Data : this.sec.commonArray['places'];
        console.log(this.sec.commonArray);
        
      });
  }

  showDatabyid(i){
    this.editData=i;
    this.village_name=this.editData['village_name'];
    this.diesel=this.editData['diesel'];
  }

  changeData(){
let value={}
    value['method'] = 'update';
    value['code'] = 'v'
    value['_id']=this.editData['_id'];
    value['village_name']=this.village_name;
    value['diesel']=this.diesel;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert('Updated');
        alert('Please Refresh!')
        
      });
  }




}
