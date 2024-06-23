import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UsersService, User } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss'],
})
export class ListeUserComponent implements OnInit {

  users: User[] = [];
  private apiUrl = 'http://127.0.0.1:9090/user/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVmNTUwODdkNmMwMzkyYjgzZDYwY2MiLCJpYXQiOjE3MTc1MjU4ODR9.-hYgaJCFKQACQP38vhEyr_WsWfyVpOk5DRiP_esDHGM'
    })
  };

  constructor(
    private userService: UsersService,
    private router : Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAll();
  }
 // get all users
  getAll() {
    this.http.get<User[]>(this.apiUrl, this.httpOptions).subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  editUser(id:any){
    localStorage.setItem('fromListUser', "true");
    const url = "users/edit/"+id
    this.router.navigateByUrl(url)
  }

  deleteUser(item: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(item).subscribe((res) => {
          Swal.fire({
            title: 'Supprimé !',
            text: 'Le utilisateur a été supprimé.',
            icon: 'success',
          }).then(() => {
            this.getAll();
          });
        });
      }
    });
  }
}
