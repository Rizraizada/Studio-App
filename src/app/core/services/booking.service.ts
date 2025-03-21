import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsKey = 'bookings';
  private bookingsSubject = new BehaviorSubject<Booking[]>(this.getBookings());

  constructor() {}

  // Get all bookings from local storage or the initial list
  getBookings(): Booking[] {
    const storedBookings = localStorage.getItem(this.bookingsKey);
    return storedBookings ? JSON.parse(storedBookings) : [];
  }

  // Add a new booking to local storage
  addBooking(booking: Booking): boolean {
    let bookings = this.getBookings();

    // Check if the selected time slot is already booked
    const isBooked = bookings.some(b =>
      b.StudioId === booking.StudioId &&
      b.Date === booking.Date &&
      (
        (booking.StartTime >= b.StartTime && booking.StartTime < b.EndTime) ||
        (booking.EndTime > b.StartTime && booking.EndTime <= b.EndTime)
      )
    );

    if (isBooked) {
      return false; // Slot is already booked
    }

    // Add the new booking to the list
    booking.Id = bookings.length + 1;
    bookings.push(booking);
    localStorage.setItem(this.bookingsKey, JSON.stringify(bookings));

    // Update the BehaviorSubject so that the components using this service can get the new bookings list
    this.bookingsSubject.next(bookings);

    return true;
  }

  // Observable to emit changes in the bookings list
  getBookingsObservable() {
    return this.bookingsSubject.asObservable();
  }
}
