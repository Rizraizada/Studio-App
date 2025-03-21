import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { User } from '../../../core/models/user.model';  // Import the User interface
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    // Load all bookings on initialization
    this.bookings = this.bookingService.getBookings();
  }

  viewBookingDetails(id: number): void {
    // Navigate to the booking details page
    this.router.navigate(['/bookings/details', id]);
  }
}
