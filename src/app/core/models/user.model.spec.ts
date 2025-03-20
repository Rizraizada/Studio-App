import { User } from './user.model';

describe('UserModel', () => {
  it('should create an instance', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+8801712345678',
      role: 'customer',
    };
    expect(user).toBeTruthy();
  });
});
