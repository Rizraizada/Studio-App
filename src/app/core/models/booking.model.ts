export interface User {
  Id: number;
  Name?: string;
  Email?: string;
  // Add other user properties as needed
}

export interface Booking {
  Id: number;
  StudioId: number;
  UserId?: number;  // Optional for backward compatibility
  User?: User;     // Made optional to work with both formats
  Date: string;
  StartTime: string;
  EndTime: string;
  Status: string;
}
