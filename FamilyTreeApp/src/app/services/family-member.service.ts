import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyMember } from '../models/family-member.model';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {
  private apiUrl = 'http://localhost:5084/api/FamilyMembers';

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<FamilyMember[]> {
    return this.http.get<FamilyMember[]>(this.apiUrl);
  }

  getMember(id: number): Observable<FamilyMember> {
    return this.http.get<FamilyMember>(`${this.apiUrl}/${id}`);
  }

  getFamilyTree(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tree`);
  }

  createMember(member: FamilyMember): Observable<FamilyMember> {
    return this.http.post<FamilyMember>(this.apiUrl, member);
  }

  updateMember(id: number, member: FamilyMember): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, member);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
