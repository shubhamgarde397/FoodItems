import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-oddisp',
  templateUrl: './oddisp.component.html',
  styleUrls: ['./oddisp.component.css'],
  providers: [ApiCallsService]
})
export class OddispComponent implements OnInit {
  public ownerdetailslist = [];
  public tableDate2=false;
  public editData={};
  public truckno='';
  public contact='';
  public driverName='';

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction

  ) { }

  ngOnInit() {
  }

  getTruck(){
let value={}
    value['method'] = 'getalltrucks';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.ownerdetailslist=res.Data;
        this.sec.commonArray['trucks'] = res.Data.length > 0 ? res.Data : this.sec.commonArray['trucks'];
        this.tableDate2=true;
      });
  }

  showDatabyid(i){
    this.editData=i;
    this.truckno=this.editData['truckno'];
    this.contact=this.editData['contact'];
    this.driverName=this.editData['driverName'];
    
  }

  changeData(){
let value={}
    value['method'] = 'update';
    value['code'] = 't'
    value['_id']=this.editData['_id'];
    value['truckno']=this.truckno;
    value['contact']=this.contact;
    value['driverName']=this.driverName;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert('Updated');
        alert('Please Refresh!')
        
      });
  }

}