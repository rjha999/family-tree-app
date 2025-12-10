import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FamilyMemberService } from '../../services/family-member.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  familyTree: any[] = [];
  loading = true;
  error = '';
  selectedMember: any = null;
  showDetailsModal = false;

  constructor(private familyMemberService: FamilyMemberService) {}

  ngOnInit(): void {
    this.loadFamilyTree();
  }

  loadFamilyTree(): void {
    this.loading = true;
    this.familyMemberService.getFamilyTree().subscribe({
      next: (data) => {
        this.familyTree = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load family tree. Please ensure the API is running.';
        this.loading = false;
        console.error('Error loading family tree:', err);
      }
    });
  }

  getMemberById(id: number | undefined): any {
    return this.familyTree.find(m => m.id === id);
  }

  getRootMembers(): any[] {
    const roots = this.familyTree.filter(m => !m.fatherId && !m.motherId);
    
    // Filter out duplicates - keep only one from each couple
    const displayed = new Set<number>();
    return roots.filter(member => {
      if (displayed.has(member.id)) {
        return false;
      }
      
      displayed.add(member.id);
      
      // If this member has a spouse, add spouse to displayed set to avoid showing them separately
      const spouse = this.getSpouse(member);
      if (spouse) {
        displayed.add(spouse.id);
      }
      
      return true;
    });
  }

  getSpouse(member: any): any {
    if (!member) return null;
    
    if (member.spouseId) {
      return this.getMemberById(member.spouseId);
    }
    // Also check if someone has this member as their spouse
    const spouse = this.familyTree.find(m => m.spouseId === member.id);
    return spouse || null;
  }

  getChildren(fatherId: number, motherId?: number): any[] {
    if (!fatherId) return [];
    
    // Get all children
    let children = this.familyTree.filter(m => {
      if (motherId) {
        // Both parents specified - match both (handle either order)
        return (m.fatherId === fatherId && m.motherId === motherId) ||
               (m.fatherId === motherId && m.motherId === fatherId);
      } else {
        // Single parent - match either parent field
        return m.fatherId === fatherId || m.motherId === fatherId;
      }
    });
    
    // Remove duplicates - if two children are married to each other, only show one
    const displayed = new Set<number>();
    return children.filter(child => {
      if (displayed.has(child.id)) {
        return false;
      }
      
      displayed.add(child.id);
      
      // Check if this child's spouse is also in the children list
      const spouse = this.getSpouse(child);
      if (spouse && children.find(c => c.id === spouse.id)) {
        // Spouse is also a sibling - mark them as displayed to avoid duplicate
        displayed.add(spouse.id);
      }
      
      return true;
    });
  }

  hasBeenDisplayedAsSpouse(member: any): boolean {
    // Check if this member's spouse appears before them in the root list
    const rootMembers = this.getRootMembers();
    const memberIndex = rootMembers.findIndex(m => m.id === member.id);
    
    if (member.spouseId) {
      const spouseIndex = rootMembers.findIndex(m => m.id === member.spouseId);
      return spouseIndex >= 0 && spouseIndex < memberIndex;
    }
    
    return false;
  }

  formatDate(date: string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  getAge(member: any): string {
    if (!member.age && !member.dateOfBirth) return 'N/A';
    return member.age ? `${member.age} years` : 'N/A';
  }

  showMemberDetails(member: any): void {
    this.selectedMember = member;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedMember = null;
  }

  getInitials(member: any): string {
    const firstInitial = member.firstName ? member.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = member.lastName ? member.lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }

  getPhotoUrl(member: any): string {
    return member.photoUrl || '';
  }
}
