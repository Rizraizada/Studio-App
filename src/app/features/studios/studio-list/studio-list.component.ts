import { Component, OnInit } from '@angular/core';
import { StudioService } from '../../../core/services/studio.service';
import { Studio } from '../../../core/models/studio.model';
import { BookingService } from '../../../core/services/booking.service';
import { Booking, User } from '../../../core/models/booking.model';

@Component({
  selector: 'app-studios',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
  studios: Studio[] = [];
  filteredStudios: Studio[] = [];
  displayedStudios: Studio[] = []; // New array for displayed studios
  currentPage: number = 1;
  itemsPerPage: number = 6; // Changed from 9 to 6 studios per page
  totalPages: number = 1;

  // Manage popup visibility and data
  showBookingPopup: boolean = false;
  selectedStudio: Studio | null = null;
  userName: string = '';
  userEmail: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  message: string = '';

  constructor(private studioService: StudioService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.studioService.getStudios().subscribe((data: any) => {
      this.studios = data.Studios;
      this.filteredStudios = [...this.studios];
      this.updatePagination();
      this.updateStudiosForCurrentPage();
    });
  }

  // Filter by location (area)
  onSearch(query: string): void {
    this.filteredStudios = this.studios.filter(studio =>
      studio.Location.Area.toLowerCase().includes(query.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page when searching
    this.updatePagination();
    this.updateStudiosForCurrentPage();
  }

  // Filter by radius search
  onSearchByRadius(params: { lat: number, lng: number, radius: number }): void {
    const { lat, lng, radius } = params;
    this.filteredStudios = this.studios.filter(studio => {
      const distance = this.getDistanceInKm(
        lat, lng, studio.Location.Coordinates.Latitude, studio.Location.Coordinates.Longitude
      );
      return distance <= radius;
    });
    this.currentPage = 1; // Reset to first page when searching
    this.updatePagination();
    this.updateStudiosForCurrentPage();
  }

  // Show booking popup and set selected studio
  onBook(studio: Studio): void {
    this.selectedStudio = studio;
    this.showBookingPopup = true;
  }

  // Handle the booking confirmation
  bookStudio(): void {
    if (!this.selectedStudio || !this.userName || !this.userEmail || !this.selectedDate || !this.selectedTime) {
      this.message = 'Please fill in all fields.';
      return;
    }

    // Create user object
    const user: User = {
      Id: 1, // You might want to generate or get this from auth service
      Name: this.userName,
      Email: this.userEmail
    };

    // Create booking object that matches the interface
    const booking: Booking = {
      Id: 0, // Will be set by the service
      StudioId: this.selectedStudio.Id,
      User: user,
      UserId: user.Id,
      Date: this.selectedDate,
      StartTime: this.selectedTime,
      EndTime: this.selectedTime, // You might want to calculate end time based on duration
      Status: 'pending'
    };

    // Call the service to add the booking
    const success = this.bookingService.addBooking(booking);

    if (success) {
      console.log('Booking successful:', booking);
      this.message = 'Booking successful!';
      this.showBookingPopup = false;
      this.resetForm();
    } else {
      this.message = 'Booking failed. Please try again.';
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

  // Convert degrees to radians
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Update pagination values
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudios.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages); // Ensure we don't go below 1
    }
  }

  // Update displayed studios for the current page
  updateStudiosForCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredStudios.length);
    this.displayedStudios = this.filteredStudios.slice(startIndex, endIndex);
  }
}
