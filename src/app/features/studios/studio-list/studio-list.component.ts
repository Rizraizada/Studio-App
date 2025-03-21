import { Component, OnInit } from '@angular/core';
import { StudioService } from '../../../core/services/studio.service';
import { Studio } from '../../../core/models/studio.model';
import { BookingService } from '../../../core/services/booking.service';
import { Booking, User } from '../../../core/models/booking.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-studios',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
  studios: Studio[] = [];
  filteredStudios: Studio[] = [];
  displayedStudios: Studio[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  showBookingPopup: boolean = false;
  selectedStudio: Studio | null = null;
  userName: string = '';
  userEmail: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  message: string = '';

  constructor(
    private studioService: StudioService,
    private bookingService: BookingService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.studioService.getStudios().subscribe((data: any) => {
      this.studios = data.Studios;
      this.filteredStudios = [...this.studios];
      this.updatePagination();
      this.updateStudiosForCurrentPage();
    });
  }

  onSearch(query: string): void {
    this.filteredStudios = this.studios.filter(studio =>
      studio.Location.Area.toLowerCase().includes(query.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePagination();
    this.updateStudiosForCurrentPage();

    if (this.filteredStudios.length === 0) {
      this.toastr.warning('No studios found matching your search.', 'No Results'); // Show warning toast
    }
  }

  onSearchByRadius(params: { lat: number, lng: number, radius: number }): void {
    const { lat, lng, radius } = params;
    this.filteredStudios = this.studios.filter(studio => {
      const distance = this.getDistanceInKm(
        lat, lng, studio.Location.Coordinates.Latitude, studio.Location.Coordinates.Longitude
      );
      return distance <= radius;
    });
    this.currentPage = 1;
    this.updatePagination();
    this.updateStudiosForCurrentPage();
  }

  onBook(studio: Studio): void {
    this.selectedStudio = studio;
    this.showBookingPopup = true;
  }

  bookStudio(): void {
    if (!this.selectedStudio || !this.userName || !this.userEmail || !this.selectedDate || !this.selectedTime) {
      this.message = 'Please fill in all fields.';
      this.toastr.error('Please fill in all fields.', 'Error'); // Show error toast
      return;
    }

    const user: User = {
      Id: 1,
      Name: this.userName,
      Email: this.userEmail
    };

    const booking: Booking = {
      Id: 0,
      StudioId: this.selectedStudio.Id,
      User: user,
      UserId: user.Id,
      Date: this.selectedDate,
      StartTime: this.selectedTime,
      EndTime: this.selectedTime,
      Status: 'pending'
    };

    const success = this.bookingService.addBooking(booking);

    if (success) {
      console.log('Booking successful:', booking);
      this.message = 'Booking successful!';
      this.toastr.success('Booking successful!', 'Success'); // Show success toast
      this.showBookingPopup = false;
      this.resetForm();
    } else {
      this.message = 'Booking failed. Please try again.';
      this.toastr.error('Booking failed. Please try again.', 'Error'); // Show error toast
    }
  }

  resetForm(): void {
    this.selectedStudio = null;
    this.userName = '';
    this.userEmail = '';
    this.selectedDate = '';
    this.selectedTime = '';
  }

  closePopup(): void {
    this.showBookingPopup = false;
    this.resetForm();
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateStudiosForCurrentPage();
    }
  }

  getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudios.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
  }

  updateStudiosForCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredStudios.length);
    this.displayedStudios = this.filteredStudios.slice(startIndex, endIndex);
  }
}
