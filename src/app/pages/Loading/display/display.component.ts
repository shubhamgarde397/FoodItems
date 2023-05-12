import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [ApiCallsService]
})
export class DisplayComponent implements OnInit {
  public show = false;
  public today;
  public todaysDate;
  public commonArray;
  public date = new Date();
  public turnbooklist: any;
  public buttonValue: any = 'Avaliable Trucks';
  public buttonOption = '1';
  public trucknoid;
  public role = 6;
  public adminAccess = false;
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Avaliable Trucks' ,'disabled':false},
    { 'value': '2', 'viewvalue': 'Truck Dispatched' ,'disabled':false},
    { 'value': '3', 'viewvalue': 'Monthly By Series' ,'disabled':false},
    { 'value': '4', 'viewvalue': 'Cancelled Vehicles' ,'disabled':true},
    { 'value': '5', 'viewvalue': 'LRNO' ,'disabled':false},
  ]
  public displayconsider=[0,0,0,0,0];
  public trucks=[];
  public ids = [];
  public partyTypes=[];
  public buttons = []
  public pochDiv = true;
  public selectedMonth;
  public selectedYear;
  public selectedmy;
  public turnbooklist_trucks = [];
  public myFormGroup: FormGroup;
  public myFormGroup1: FormGroup;
  public considerArray;
  public villagelist: any;
  public parties: any;
  public tempVNAME;
  public placeid;
  public partyid;
  public tempPNAME;
  public toSendid;
  public show8Msg = "";
  public selectpartyType;
  public partyVar;
  public truckVar;
  public truckid;
  public byTruckName=false;
  public byInvoice;
  public bylrno;
  public turn11;
  public oids=[];
  public showprdfP=false;
  public truckSelected=false;
  public amountShow;
  public tempDate;
  public comment='';
  public showbuttonOption8211=false;
  public showbuttonOption82111=false;
  public buttonOptionPartyType;
  public tableSelected=false;
  public years = []
  public tempObj={};
public whatActionGotSelected='2';
public performActionButton='2';
public selectDate=false;
public typeofloads=[];
public reportPDF=false;
public turn12;
public fdate;
public tdate;
public partyToUI='';
public SpartyType='';
public buttonOptionVehicleType='';
public updateTruck:any={'truckno':''};
public placeid2='';
public tempVNAME2='';
public place;
public place2;
public party;
public partyType;
public Loadarr=[];
public showbuttonOption8 = false;
public showbuttonOption82 = false;
public showbuttonOption821 = false;
public turnbooklistnew = [];
public showbuttonOption821HA=true;
public indexBig;
public showEditOtherDiv=false;
public monthlybyseriesData={'place':'','place2':'','typeOfLoad':'','party':'','lrno':''}

public nrcmid=0;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.considerArray = this.handleData.createConsiderArray('turnbookadd')
    this.nrcmid=this.securityCheck.nrcmid;
    this.handleData.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.role = this.securityCheck.role;
    this.commonArray = this.securityCheck.commonArray;
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.buttons=this.getButtons()
    this.turnbooklist = [];
    this.turnbooklist = this.handleData.giveTurn(); 
    this.tableSelected=this.turnbooklist.length>0?true:false;
    this.myFormGroup = this.formBuilder.group({
      truckno: '',
      place: '',
      place2: '',
      partyName: '',
      loadingDate: '',
      partyType: '',
    });

    switch (this.securityCheck.nrcmid) {
      case 4:
        this.displayconsider=[1,0,1,0,1];
        this.displayconsider.forEach((r,i) => {
          if(r===1){
            this.displayoptions[i]['disabled']=false;
          }else{
            this.displayoptions[i]['disabled']=true;
          }
        });
        break;
      case 3:
        this.displayconsider=[1,1,1,1,1]
        this.displayconsider.forEach((r,i) => {
          if(r===1){
            this.displayoptions[i]['disabled']=false;
          }else{
            this.displayoptions[i]['disabled']=true;
          }
        });
        break;
    }

  }

  performActionSetter(data4){
// 0 : delete forever
// 1 : cancel
// 2 : Edit
      this.performActionButton=String(this.whatActionGotSelected);
  }

  getButtons() {
    let buttons=[]
        for (let i = 0; i < new Date().getFullYear() - 2022; i++) {
          this.years.push(i + 2023)
        }
        for (let i = 0; i < this.years.length; i++) {
          let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
          for (let j = 0; j < months; j++) {
            let date = new Date(String(i + 2023) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
            let month = date.toLocaleString('default', { month: 'short' });
            this.tempObj['value'] = "^" + String(i + 2023) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + ".*";
            this.tempObj['viewValue'] = month + '-' + String(i + 2023).slice(-2);
            buttons.push(this.tempObj);
            this.tempObj = {}
          }
        }
        return buttons.reverse();
      }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.parties = [];
    this.trucks=[]
    this.villagelist = [];
    this.parties = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
  }

  findOption() {
    this.buttonOption = this.trucknoid;
    this.buttonValue = this.displayoptions[parseInt(this.trucknoid) - 1].viewvalue;
  }


  find = function (data = null) {//only for data from 1st april 2021 and loading data is empty
    let tempObj = {};
    this.parties = this.commonArray.gstdetails;
    switch (this.buttonOption) {
      case '1':
        tempObj['turnbookDate'] = '2021-04-01';
        break;
     
      case '2':
        tempObj['turnbookDate'] = this.dynDate;
        break;
        case '3':
          tempObj['date'] = this.selectedmy;
          tempObj['partyType']=this.buttonOptionPartyType;
          break;
        case '5':
          tempObj['lrno']=this.bylrno;
        break;
      default:
        break;
    }


    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTB'
    tempObj['display'] = this.buttonOption;

    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        
        if (this.buttonOption == '3') {
          if (res.Data.length > 0) {
            this.showbuttonOption8 = true;
            this.turnbooklistnew = res.Data;
            this.myFormGroup1 = this.formBuilder.group({
              loadingDateDynamic: '',
              typeOfLoad:'',
              turnbookDate: '',
              truckno: '',
              loadingDate: '',
              lrno: 0
            });
            if(this.buttonOptionPartyType==='NRCM'){
              this.showbuttonOption821HA=false;
              this.showbuttonOption8211=true;
              this.typeofloads=['Pipe','Fittings']
            }else{
                
                  this.typeofloads=['Others']
                
              this.showbuttonOption821HA=true;
              this.showbuttonOption8211=false;
            }
          } else {
            this.showbuttonOption8 = false;
            this.show8Msg = "All set for this month.";
          }
          this.parties = this.parties.filter(r=>{return r.partyType===this.buttonOptionPartyType})
        }
        else{
          this.turnbooklist = res.Data;
          this.isAvailable=true;
          this.handleData.saveTurn(this.turnbooklist);
          this.tableSelected=true;
        }
      });
  };




  uncheckPoch(data, j) {
    let tempObj = {};
    tempObj['method'] = 'updatePoch';
    tempObj['tablename'] = 'turnbook';
    tempObj['_id'] = data['_id'];
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert('Moved to Balance Hire!')
        this.turnbooklist.splice(j, 1);
      });
  }

  showDatabyid = function (data, j, number) {
    console.log(data);
    
    if(this.buttonOption!=='4'){
      this.show = true;
      let tempObj = {};
      tempObj['place'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0].village_name;
      tempObj['place2'] = data.villageDetails2[0] === undefined ? '' : data.villageDetails2[0].village_name;
      tempObj['truckno'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0].truckno;
      tempObj['partyName'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0].name;
      tempObj['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;
      tempObj['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0].village_name;
      tempObj['placeid2'] = data.villageDetails2[0] === undefined ? '' : data.villageDetails2[0].village_name;
      tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
      tempObj['entryDate'] = data.entryDate;
      tempObj['_id'] = data._id;
      tempObj['partyType'] = data.partyType;
      tempObj['turnbookDate'] = data.turnbookDate;
      tempObj['loadingDate'] = data.loadingDate;
      tempObj['lrno'] = data.lrno === undefined ? '' : data.lrno;
      tempObj['index'] = j;
      this.indexBig=j;
      tempObj['number'] = number;
      tempObj['typeOfLoad'] = data.typeOfLoad;
      this.updateTruck=tempObj;
      this.partyid=data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
      this.SpartyType=data.partyType
      this.getForm();
    }

  };



  change(data) {
    let tempData = {}

    tempData['lrno'] = data.value.lrno===0?this.tempDate[0]['lrno']:data.value.lrno;
    tempData['partyType']=this.buttonOptionPartyType;
    tempData['typeOfLoad'] = data.value.typeOfLoad;
    tempData['_id'] = this.toSendid;
    tempData['tablename'] = 'turnbook'
    tempData['method'] = 'updateSeries1'
    
    this.apiCallservice.handleData_New_python('turnbook', 1, tempData, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        let newData = this.turnbooklistnew.filter(r => r._id !== this.toSendid);
        this.handleData.saveTurn([]);
        this.handleData.saveTurn(newData);
        this.turnbooklistnew = newData;
        this.myFormGroup.patchValue({ turnbookDate: '' })
        this.myFormGroup.patchValue({ partyType: '' })

        this.showbuttonOption82 = false;
        this.showbuttonOption821 = false;
      });
  }

  getForm(){
    this.place = this.updateTruck.place;
    this.place2 = this.updateTruck.place2;
    this.placeid = this.updateTruck.placeid;
    this.placeid2 = this.updateTruck.placeid2;
    this.party = this.updateTruck.partyName;
    this.partyType = this.updateTruck.partyType;
    this.partyid = this.updateTruck.partyid;
    
    this.myFormGroup.patchValue({
      truckno: this.updateTruck.truckno,
      place: this.updateTruck.place,
      place2: this.updateTruck.place2,
      partyName: this.updateTruck.partyName,
      loadingDate: this.updateTruck.loadingDate,
      partyType: this.updateTruck.partyType,
    });    
  }

  showDatabyid2 = function (type,data=this.updateTruck) {
    let newdate;
    let newtype;
    let newpochDate;
    let newgivenDate;
    let pgno;
    switch (type) {
      case 'cancel':
        newdate = '2099-12-12';
        newtype = 'Cancel';
        newpochDate = '2099-12-12';
        newgivenDate='2099-12-12';
        pgno = 997;
        break;
      case 'uncancel':
        newdate = '';
        newtype = '';
        newpochDate = '';
        newgivenDate='';
        pgno = 999;
        break;
    }
    if (confirm('Do you want to Cancel this Vehicle?')) {
      this.show = true;

      let tempObj = {};
      tempObj['_id'] = data._id;
      tempObj['loadingDate'] = newdate;
      tempObj['ownerid']=this.updateTruck.ownerid;
      tempObj['method'] = 'canuncanel';
      tempObj['tablename'] = 'turnbook';
      tempObj["partyType"] = newtype;
      tempObj["pochDate"] = newpochDate;
      tempObj["givenDate"] = newgivenDate;
      tempObj["pgno"] = pgno;
      tempObj['number'] = 2;
      this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.turnbooklist.splice(this.indexBig, 1);
        });
    }
  };

  delete() {
    let data=this.updateTruck;
    let id=data;
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'turnbook';
      formbody['turnbookDate'] = id.turnbookDate;

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          alert(response['Status'])
          this.turnbooklist.splice(this.updateTruck['index'], 1);
        });
    }
  }

  changeDivPartyWise(){
    if(this.myFormGroup.value.partyType==='NRCM'){
      this.showEditOtherDiv=false;
      this.villagelist = [];
    this.commonArray.villagenames.forEach(r=>{this.villagelist.push(r.village_name)})
    }else{
      this.showEditOtherDiv=true;
      this.villagelist=[];

    }
    this.parties = this.commonArray.gstdetails;
    


    this.parties=this.parties.filter(r=>r.partyType==this.myFormGroup.value.partyType)
  }


  edit2() {
    this.show = true;
    let tempObj={}    
    tempObj['_id']=this.updateTruck._id;
    tempObj['ownerid']=this.updateTruck.ownerid;
    tempObj['loadingDate']=this.myFormGroup.value.loadingDate;
    tempObj['partyid']=this.partyid;//send name
    tempObj['placeid']=this.myFormGroup.value.place;//send name
    tempObj['placeid2']=this.myFormGroup.value.place2;//send name
    tempObj['method'] = 'updateTurnSingle';
    tempObj['tablename'] = '';
    tempObj['partyType'] = this.myFormGroup.value.partyType;
    tempObj['number']=0
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
    .subscribe((response: Response) => {
      alert(response['Status'])
      this.turnbooklist.splice(this.indexBig, 1);
    });
  }

  // edit2() {
  //   this.show = true;
  //   let tempObj={}
  //   tempObj['_id']=this.updateTruck._id;
  //   tempObj['ownerid']=this.updateTruck.ownerid;
  //   tempObj['loadingDate']=this.myFormGroup.value.loadingDate;
  //   tempObj['partyid']=this.partyid;//send name
  //   tempObj['placeid']=this.myFormGroup.value.place;//send name
  //   tempObj['placeid2']=this.myFormGroup.value.place2;//send name
  //   tempObj['method'] = 'updateTurnSingle';
  //   tempObj['tablename'] = '';
  //   tempObj['partyType'] = this.myFormGroup.value.partyType;
  //   tempObj['lrno'] = this.myFormGroup.value.lrno;
  //   tempObj['number']=0
  //   this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
  //   .subscribe((response: Response) => {
  //     alert(response['Status'])
  //     this.turnbooklist.splice(this.indexBig, 1);
  //   });
  // }

  // setPlaceName() {
  //   this.placeid = this.villagelist[this.myFormGroup.value.place.split('+')[1]]._id;
  //   this.tempVNAME = this.villagelist[this.myFormGroup.value.place.split('+')[1]].village_name;
  //   this.myFormGroup.value.place = this.tempVNAME;
  // }

  // setPlaceName2() {
  //   let placeChecker=this.myFormGroup.value.place2;
  //   if(placeChecker===null||placeChecker===undefined||placeChecker===''){}else{
  //   this.placeid2 = this.villagelist[this.myFormGroup.value.place2.split('+')[1]]._id;
  //   this.tempVNAME2 = this.villagelist[this.myFormGroup.value.place2.split('+')[1]].village_name;
  //   this.myFormGroup.value.place2 = this.tempVNAME2;
  //   }
  // }

  setPartyName() {
    this.partyid = this.parties[this.myFormGroup.value.partyName.split('+')[1]]._id;
    this.tempPNAME = this.parties[this.myFormGroup.value.partyName.split('+')[1]].name;
    this.myFormGroup.value.partyName = this.tempPNAME;
    this.villagelist=this.parties.filter(r=>r['_id']==this.partyid)[0]['cities']

    
  }

  setPartyNameMS() {
    let filteredList=this.parties.filter(r=>{return r.name==this.myFormGroup1.value.partyName})
    this.partyid=filteredList[0]['_id']
    this.tempPNAME=filteredList[0]['name']
    this.myFormGroup1.value.partyName = this.tempPNAME;
    this.villagelist=this.parties.filter(r=>r['_id']==this.partyid)[0]['cities']
        if(this.buttonOptionPartyType==='NRCM'){
              this.typeofloads=['','Pipe','Fittings']
            }else{
                if(this.myFormGroup1.value.partyName==='GRL'){
                  this.typeofloads=['','Pipe','Bundle','FP']
                }
                else{
                  this.typeofloads=['','Others']
                }
            }
  }

  getOtherDetails() {
    this.showbuttonOption82 = true;
    this.turnbooklist_trucks = this.turnbooklistnew.filter(r => r.loadingDate == this.myFormGroup1.value.loadingDateDynamic)
  }
  getOtherDetails2() {
    this.tempDate = this.turnbooklist_trucks.filter(r => r.truckno == this.myFormGroup1.value.truckno);
    this.monthlybyseriesData['typeOfLoad']=this.tempDate[0].typeOfLoad;
    this.monthlybyseriesData['lrno']=this.tempDate[0].lrno;
    this.monthlybyseriesData['party']=this.tempDate[0].party['name'];
    this.monthlybyseriesData['place']=this.tempDate[0].place['village_name'];
    this.monthlybyseriesData['place2']=this.tempDate[0].place2?this.tempDate[0].place2['village_name']:'';

this.placeid=this.tempDate[0]['place']['village_name']
this.placeid2=this.tempDate[0]['place2']?this.tempDate[0]['place2']['village_name']:'';
this.partyid=this.tempDate[0]['party']['_id']

    this.toSendid = this.tempDate[0]._id;
    this.showbuttonOption821 = true;
    if(this.showbuttonOption8211==true){
    this.showbuttonOption82111 = true;
    }
    else{
      this.showbuttonOption82111 = false;
    }
    this.myFormGroup1.patchValue({ turnbookDate: this.tempDate[0]['turnbookDate'] })
    this.myFormGroup1.patchValue({ lrno: this.tempDate[0]['lrno'] })
  }

}
