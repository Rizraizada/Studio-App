import { User } from '../../core/models/user.model';  // Import User if it's part of the Booking model

export interface Booking {
  Id: number;
  User: User;  // Reference to the User object
  StudioId: number;
  Date: string;
  StartTime: string;
  EndTime: string;
  Status: string;
}
