import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { StudioService } from '../../../core/services/studio.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  booking!: Booking;
  studioName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private studioService: StudioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBooking(id);
  }

  loadBooking(id: number): void {
    const bookings = this.bookingService.getBookings();
    const found = bookings.find(b => b.Id === id);

    if (found) {
      this.booking = found;
      // Ensure User property exists
      if (!this.booking.User) {
        this.booking.User = {
          Id: this.booking.UserId || 0,
          Name: 'Unknown User',
          Email: 'no-email@example.com'
        };
      }
      this.loadStudioName();
    } else {
      this.router.navigate(['/bookings']);
    }
  }

  loadStudioName(): void {
    this.studioService.getStudios().subscribe((data: any) => {
      const studio = data.Studios.find((s: any) => s.Id === this.booking.StudioId);
      this.studioName = studio ? studio.Name : 'Unknown Studio';
    });
  }

  getStatusClass(): string {
    switch (this.booking.Status.toLowerCase()) {
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

  cancelBooking(): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const bookings = this.bookingService.getBookings();
      const index = bookings.findIndex(b => b.Id === this.booking.Id);

      if (index !== -1) {
        bookings[index].Status = 'cancelled';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        this.booking.Status = 'cancelled';
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/bookings']);
  }
}
