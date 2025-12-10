export interface FamilyMember {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  gender: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  occupation?: string;
  notes?: string;
  fatherId?: number;
  motherId?: number;
  spouseId?: number;
  createdAt?: string;
  updatedAt?: string;
}
