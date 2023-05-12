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
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public name: string;
  public dbName = 'NRCM_Information';
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService,public location:Location) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      village_name: ['', Validators.required],
      diesel:0
    });
  }

  store({ value, valid }: { value: [{}], valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['code'] = 'v';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert('Added Successfully');
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}

