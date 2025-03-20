import { Booking } from './booking.model';

describe('BookingModel', () => {
  it('should create an instance', () => {
    const booking: Booking = {
      id: 1,
      studioId: 1,
      userId: 1,
      date: '2025-03-20',
      startTime: '10:00',
      endTime: '12:00',
      totalPrice: 3050,
      currency: 'BDT',
      status: 'confirmed',
    };
    expect(booking).toBeTruthy();
  });
});
