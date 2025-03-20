export interface User {
  id: number;
  Name: string;
  Email: string;
  Phone: string;
  Role: 'admin' | 'customer' | 'studio-owner';
}
