import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public todayDate;
  
  public data=[];
  
  public myFormGroup: FormGroup;
  public display=false;
public rArr=[];
public reason=''
public hugeData={'food':'','reason':[]}
public adder=[];
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public handleF:handleFunction,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    

    this.todayDate=this.handleF.createDate(new Date());
    this.myFormGroup = this.formBuilder.group({
      food: '',
      eatable: '',
      reason:''
    });
  }

  saveData(i){
    this.hugeData=i;
    console.log(this.hugeData);
    
  }

  clicker(data){
    switch (data) {
      case 'add':
        this.display=false;
        break;

        case 'get':
          this.display=true;
          this.find();
        break;
    }
  }

find(){
        let tempObj1={};
    tempObj1['method'] = 'getFoods'
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()))
      .subscribe((res: any) => {
        this.data=res.Data;
        
      });

}

  store(data) {
    data.value['method'] = 'insert';
    data.value['reason'] = this.rArr;
    data.value['eatable'] = data.value['eatable']===''?false:data.value['eatable'];
    this.apiCallservice.handleData_New_python
      ('commoninformation',
       1, data.value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

  addMore() {
    this.rArr.push(this.myFormGroup.value.reason)
    this.reason = '';
  }
  addMoreC() {
    this.hugeData['reason'].push(this.reason)
    this.adder.push(this.reason)
    this.reason = '';
  }
  

  update(){
    let data={}
    data['method'] = 'update';
    data['_id'] = this.hugeData['_id'];
    data['reason'] = this.adder;
    this.apiCallservice.handleData_New_python
      ('commoninformation',
       1, data, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }
  delete(j){
    this.rArr.splice(j,1);
  }
}