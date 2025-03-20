export interface Booking {
  Id: number;
  StudioId: number;
  UserId: number;
  Date: string;
  StartTime: string;
  EndTime: string;
  TotalPrice: number;
  Currency: string;
  Status: 'pending' | 'confirmed' | 'cancelled';
}
