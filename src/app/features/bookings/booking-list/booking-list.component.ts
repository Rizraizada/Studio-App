import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { StudioService } from '../../../core/services/studio.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  studios: any[] = [];

  constructor(
    private bookingService: BookingService,
    private studioService: StudioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadStudios();

    // Subscribe to booking changes
    this.bookingService.getBookingsObservable().subscribe(bookings => {
      this.bookings = bookings;
      // Ensure all bookings have User property
      this.bookings.forEach(booking => {
        if (!booking.User && booking.UserId) {
          booking.User = {
            Id: booking.UserId,
            Name: 'Unknown User',
            Email: 'no-email@example.com'
          };
        }
      });
    });
  }

  loadBookings(): void {
    this.bookings = this.bookingService.getBookings();
    // Ensure all bookings have User property
    this.bookings.forEach(booking => {
      if (!booking.User && booking.UserId) {
        booking.User = {
          Id: booking.UserId,
          Name: 'Unknown User',
          Email: 'no-email@example.com'
        };
      }
    });
  }

  loadStudios(): void {
    this.studioService.getStudios().subscribe((data: any) => {
      this.studios = data.Studios;
    });
  }

  getStudioName(studioId: number): string {
    const studio = this.studios.find(s => s.Id === studioId);
    return studio ? studio.Name : 'Unknown Studio';
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  viewBooking(booking: Booking): void {
    this.router.navigate(['/bookings', booking.Id]);
  }

  cancelBooking(booking: Booking): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const bookings = this.bookingService.getBookings();
      const index = bookings.findIndex(b => b.Id === booking.Id);

      if (index !== -1) {
        bookings[index].Status = 'cancelled';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        booking.Status = 'cancelled';
      }
    }
  }
}
