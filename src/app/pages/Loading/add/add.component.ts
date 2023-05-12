import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ApiCallsService]
})
export class AddComponent implements OnInit {
public places=[];
public trucks=[];
public diesel=0;
  public myFormGroup: FormGroup;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService,public location:Location) { }

    

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      loadingDate:'',
      truckid: '',
      placeidfrom:'',
      placeidto:'',
      lrno:'',
      diesel:0,
      amount:0
    });
    this.places=this.securityCheck.commonArray['places'];
    this.trucks=this.securityCheck.commonArray['trucks'];
  }
  getDA(){
    this.diesel=this.places.filter(res=>{return res.village_name==this.myFormGroup.value.placeidto})[0]['diesel']
  }

  getVillages(){
    let value={}
    value['method'] = 'getallplaces';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.places=res.Data;
        this.securityCheck.commonArray['places'] = res.Data.length > 0 ? res.Data : this.securityCheck.commonArray['places'];
      });
  }
  getTrucks(){
    let value={}
    value['method'] = 'getalltrucks';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.trucks=res.Data;
        this.securityCheck.commonArray['trucks'] = res.Data.length > 0 ? res.Data : this.securityCheck.commonArray['trucks'];
      });
  }

  store({ value, valid }: { value: [{}], valid: boolean }) {

    value['method'] = 'insert';
    value['code'] = 'l';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.myFormGroup.patchValue({truckno:'',lrno:'',diesel:0,amount:0,loadingDate:'',truckid:'',placeidto:'',placeidfrom:''})
      });
  }

}

