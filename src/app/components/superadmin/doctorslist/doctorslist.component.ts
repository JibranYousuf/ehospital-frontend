import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-doctorslist',
  templateUrl: './doctorslist.component.html',
  styleUrls: ['./doctorslist.component.css']
})
export class DoctorslistComponent implements OnInit {
  data: Array<any> = [];
  doctorData: Array<any> = [];

  constructor(
    private authService:AuthService,
    private router:Router)
   {
    }
  

    ngOnInit() {
      this.authService.getAllDoc().subscribe((docdata) => {
        console.log(docdata);
        this.doctorData = docdata.getDocData;
      },
      err => {
        console.log(err);
        return false;
      });
    }
    

}
