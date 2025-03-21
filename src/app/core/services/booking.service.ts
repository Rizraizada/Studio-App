import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsKey = 'bookings';
  private bookingsSubject = new BehaviorSubject<Booking[]>(this.getBookings());

  constructor() {
    console.log('BookingService initialized');
  }

  getBookings(): Booking[] {
    const storedBookings = localStorage.getItem(this.bookingsKey);
    const bookings = storedBookings ? JSON.parse(storedBookings) : [];
    console.log('Fetched bookings from localStorage:', bookings);
    return bookings;
  }

  addBooking(booking: Booking): boolean {
    if (!booking) {
      console.error('Attempted to add undefined/null booking');
      return false;
    }

    let bookings = this.getBookings();
    console.log('Before adding, current bookings:', bookings);

    // Ensure booking has an ID
    booking.Id = bookings.length ? Math.max(...bookings.map(b => b.Id)) + 1 : 1;

    // Add the booking to the array
    bookings.push(booking);
    console.log('After adding, updated bookings:', bookings);

    try {
      // Save to localStorage
      localStorage.setItem(this.bookingsKey, JSON.stringify(bookings));

      // Verify if it saved
      const storedBookings = localStorage.getItem(this.bookingsKey);
      console.log('After saving to localStorage, data:', storedBookings);

      // Update the subject
      this.bookingsSubject.next(bookings);
      return true;
    } catch (error) {
      console.error('Error saving booking to localStorage:', error);
      return false;
    }
  }

  getBookingsObservable() {
    console.log('Bookings Observable requested');
    return this.bookingsSubject.asObservable();
  }

  private convertTimeToNumber(time: string): number {
    const [hour, minutePart] = time.split(':');
    const minute = parseInt(minutePart, 10);
    const isPM = time.includes('PM');
    let hourNumber = parseInt(hour, 10);

    if (isPM && hourNumber !== 12) {
      hourNumber += 12;
    } else if (!isPM && hourNumber === 12) {
      hourNumber = 0;
    }

    return hourNumber + minute / 60;
  }
}
