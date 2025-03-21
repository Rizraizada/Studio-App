import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { StudioService } from '../../../core/services/studio.service';
import { Booking } from '../../../core/models/booking.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  studios: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of items per page
  totalPages: number = 1;

  constructor(
    private bookingService: BookingService,
    private studioService: StudioService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadStudios();
  }

  loadBookings(): void {
    this.bookings = this.bookingService.getBookings();
    this.totalPages = Math.ceil(this.bookings.length / this.itemsPerPage);
    this.updateDisplayedBookings();
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
        this.toastr.success('Booking cancelled successfully!', 'Success'); // Show success toast
        this.loadBookings(); // Refresh the bookings list
      } else {
        this.toastr.error('Failed to cancel booking.', 'Error'); // Show error toast
      }
    }
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateDisplayedBookings();
    }
  }

  updateDisplayedBookings(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.bookings = this.bookingService.getBookings().slice(startIndex, endIndex);
  }
}
