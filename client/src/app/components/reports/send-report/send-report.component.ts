import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.component.html',
  styleUrls: ['./send-report.component.css']
})
export class SendReportComponent implements OnInit {

  private file: File = null;
  public email: string = '';
  public error = [];

  constructor(private ServiceR: ReportService, private router: Router) { }

  ngOnInit(): void {
  }

  onUpload() {
    const formData = new FormData();
    this.file != null ? formData.append("file", this.file, this.file.name) : formData;
    formData.append("email", this.email);

    return this.ServiceR.uploadFile(formData).subscribe(
      result => this.handleResponse(result),
      error => this.handleError(error)
    );

  }

  onFileChange(files: FileList) {
    this.file = files.item(0);
  }

  showModalError(msg: string) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  cancelBtn() {
    this.file = null;
    this.email = '';
    this.error = [];
    this.router.navigateByUrl('/profile');
  }

  handleResponse(result) {
    this.showModalError(result);
    this.cancelBtn();
  }

  handleError(error) {
    this.error = error.error.errors;
    this.showModalError(this.error[0].msg);
  }

}
