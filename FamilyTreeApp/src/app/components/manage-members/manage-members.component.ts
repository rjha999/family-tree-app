import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FamilyMemberService } from '../../services/family-member.service';
import { FamilyMember } from '../../models/family-member.model';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {
  members: FamilyMember[] = [];
  showModal = false;
  isEditMode = false;
  currentMember: FamilyMember = this.getEmptyMember();
  loading = true;
  error = '';
  successMessage = '';

  constructor(private familyMemberService: FamilyMemberService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.loading = true;
    this.familyMemberService.getAllMembers().subscribe({
      next: (data) => {
        this.members = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load family members. Please ensure the API is running.';
        this.loading = false;
        console.error('Error loading members:', err);
      }
    });
  }

  getEmptyMember(): FamilyMember {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      gender: 'Male',
      dateOfBirth: undefined,
      dateOfDeath: undefined,
      photoUrl: '',
      email: '',
      phone: '',
      address: '',
      occupation: '',
      notes: '',
      fatherId: undefined,
      motherId: undefined,
      spouseId: undefined
    };
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentMember = this.getEmptyMember();
    this.showModal = true;
    this.error = '';
    this.successMessage = '';
  }

  openEditModal(member: FamilyMember): void {
    this.isEditMode = true;
    this.currentMember = { ...member };
    this.showModal = true;
    this.error = '';
    this.successMessage = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.currentMember = this.getEmptyMember();
  }

  saveMember(): void {
    if (!this.currentMember.firstName || !this.currentMember.lastName) {
      this.error = 'First name and last name are required.';
      return;
    }

    if (this.isEditMode) {
      this.familyMemberService.updateMember(this.currentMember.id, this.currentMember).subscribe({
        next: () => {
          this.successMessage = 'Member updated successfully!';
          this.loadMembers();
          this.closeModal();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.error = 'Failed to update member.';
          console.error('Error updating member:', err);
        }
      });
    } else {
      this.familyMemberService.createMember(this.currentMember).subscribe({
        next: () => {
          this.successMessage = 'Member added successfully!';
          this.loadMembers();
          this.closeModal();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.error = 'Failed to add member.';
          console.error('Error adding member:', err);
        }
      });
    }
  }

  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.familyMemberService.deleteMember(id).subscribe({
        next: () => {
          this.successMessage = 'Member deleted successfully!';
          this.loadMembers();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          if (err.error?.message) {
            this.error = err.error.message;
          } else {
            this.error = 'Failed to delete member.';
          }
          console.error('Error deleting member:', err);
          setTimeout(() => this.error = '', 5000);
        }
      });
    }
  }

  getMemberName(id: number | undefined): string {
    if (!id) return 'None';
    const member = this.members.find(m => m.id === id);
    return member ? `${member.firstName} ${member.lastName}` : 'Unknown';
  }

  getAvailableParents(gender: 'Male' | 'Female'): FamilyMember[] {
    return this.members.filter(m => 
      m.gender === gender && m.id !== this.currentMember.id
    );
  }

  getAvailableSpouses(): FamilyMember[] {
    return this.members.filter(m => 
      m.id !== this.currentMember.id && m.id !== this.currentMember.spouseId
    );
  }
}
