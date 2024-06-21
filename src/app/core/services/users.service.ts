import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface User {
  _id?: string;
    name?:string;
    email?:string;
    password?:string;
    age?:number;
    address?:string;
    verified?:boolean;
    verificationCode?:string;
    phoneNumber?:string;
    token?:string;
    role?:string;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:9090/User';
  constructor(
    private http : HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  //omar.taamallah@pardus-it.com
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getuserbyEmail/${email}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
