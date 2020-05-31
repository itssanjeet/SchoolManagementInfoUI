import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  student: Student[] = [];
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.studentService.getAllStudent().subscribe(data => {
      console.log(data);
    });
  }

}
