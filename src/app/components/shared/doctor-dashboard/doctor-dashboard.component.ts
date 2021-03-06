import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AptService } from '../../../services/apt.service';
import { Response } from '@angular/http/src/static_response';
import { ValidateService } from '../../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  filter: any;
  user:any;
  appointment: any;
  prescription: any;
  prsData: Array<any> =[];
  doctorData: Array<any> =[];
  patientData: Array<any> =[];
  data: Array<any> = [];
  aptData: Array<any> = [];
  editItemsForm: boolean = false;
  name : String;
  drname: String;
  aptDateCreated: any;
  aptDate: any;
  aptStatus: String;
  aptType: String;
  contactnum: String;
  prsDateCreated: any;
  prsDate: any;
  prsStatus: String;
  prsType: String;
  prsbill: String;
  
  constructor(
    private validateService: ValidateService, 
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private aptService:AptService,
    private router:Router
  ) { }
  

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });    
    this.authService.getAllPatient().subscribe((patientdata) => {
      console.log(patientdata);
      this.patientData = patientdata.getPatientData;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  

  onView(){
    this.authService.getAllProfile().subscribe((data) => {
      console.log(data);
      this.data = data.getData;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onAppointmentView(){
    this.aptService.getAllAppointments().subscribe((data) => {
      console.log(data);
      this.aptData = data.getAppointmentData;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  
  onAppointmentSubmit(){
    const appointment = {
      name: this.name,
      drname: this.drname,
      aptStatus: this.aptStatus,
      aptType: this.aptType,
      aptDateCreated: this.aptDateCreated,
      aptDate: this.aptDate,
      contactnum: this.contactnum,
    }
    if(!this.validateService.validateAppointment(appointment)){
      this.flashMessage.show('Please Fill in all fields', {cssClass: 'alert-danger', timeout: 3000})
      return false;
    }
    
    this.aptService.createApt(appointment).subscribe(data =>{
      if(data.success){ 
        this.router.navigate(['/dashboard']);
      } else{    
        this.router.navigate(['/profile']);
      }
    });
  }

  onPrescriptionView(){
    this.aptService.getAllPrescriptions().subscribe((data) => {
      console.log(data);
      this.prsData = data.getPrescriptionData;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  
  onPrescriptionSubmit(){
    const prescription = {
      name: this.name,
      drname: this.drname,
      prsStatus: this.prsStatus,
      prsType: this.prsType,
      prsDateCreated: this.prsDateCreated,
      prsDate: this.prsDate,
      contactnum: this.contactnum,
      prsbill: this.prsbill,
    }
    
    
    this.aptService.createPrs(prescription).subscribe(data =>{
      if(data.success){ 
        this.router.navigate(['/dashboard']);
      } else{    
        this.router.navigate(['/profile']);
      }
    });
  }
  onUpdateUser(user){     
    console.log(user, "_id")
    var url = "update" + "/" + user._id
    this.authService.updateUser(url, user).subscribe(
      (data) => {
        console.log(data, "fgdfg");
        this.data = data.getData;
        this.authService.getUser(user.username);
        this.editItemsForm = false;
        
      },
      (err) => {
        return err
      }
    )
  }
  onUpdateApt(appointment){     
    console.log(appointment, "_id")
    var url = "update" + "/" + appointment._id
    this.aptService.updateAppointment(url, appointment).subscribe(
      (data) => {
        this.aptData = data.getAppointmentData;
        this.aptService.getAppointment(appointment.username);
        this.editItemsForm = false;
        
      },
      (err) => {
        return err
      }
    )
  }
  OnDeleteAppointment(_id, i: number){
    this.aptService.deleteAppointment(_id).subscribe(data=> {
      this.data.splice(i, 1)
      console.log(data,"data from db")
    },
    err => {
      console.error(err, "error" )
    }
  )};
  onUpdatePrs(prescription){     
    console.log(prescription, "_id")
    var url = "update" + "/" + prescription._id
    this.aptService.updatePrescription(url, prescription).subscribe(
      (data) => {
        this.aptData = data.getPrescriptionData;
        this.aptService.getPrescription(prescription.username);
        this.editItemsForm = false;
        
      },
      (err) => {
        return err
      }
    )
  }
  OnDeletePrescription(_id, i: number){
    this.aptService.deletePrescription(_id).subscribe(data=> {
      this.data.splice(i, 1)
      console.log(data,"data from db")
    },
    err => {
      console.error(err, "error" )
    }
  )};
}