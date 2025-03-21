import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  // Import ToastrService
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent {
  @Input() studio: any;
  @Input() userName: string = '';
  @Input() userEmail: string = '';
  @Input() selectedDate: string = '';
  @Input() selectedTime: string = '';
  @Input() message: string = '';

  @Output() closePopup = new EventEmitter<void>();
  @Output() book = new EventEmitter<void>();

  // Output properties for two-way binding
  @Output() userNameChange = new EventEmitter<string>();
  @Output() userEmailChange = new EventEmitter<string>();
  @Output() selectedDateChange = new EventEmitter<string>();
  @Output() selectedTimeChange = new EventEmitter<string>();
  @Output() messageChange = new EventEmitter<string>();

  constructor(private toastr: ToastrService, private router: Router) {
    console.log('CreateBookingComponent initialized');

  }

  onBook(): void {
    this.book.emit();
    this.toastr.success('Your booking has been successfully created!', 'Booking Success');
    this.router.navigate(['/bookings']);
  }
  onCancel(): void {
    this.closePopup.emit();
  }
  onUserNameChange(value: string): void {
    this.userNameChange.emit(value);
  }

  onUserEmailChange(value: string): void {
    this.userEmailChange.emit(value);
  }

  onSelectedDateChange(value: string): void {
    this.selectedDateChange.emit(value);
  }

  onSelectedTimeChange(value: string): void {
    this.selectedTimeChange.emit(value);
  }

  onMessageChange(value: string): void {
    this.messageChange.emit(value);
  }

  // Get time slots based on studio availability
  getTimeSlots(): string[] {
    if (!this.studio?.Availability) {
      return [];
    }

    const timeSlots: string[] = [];
    const { Open, Close } = this.studio.Availability;
    const openTime = this.convertTo24Hour(Open);
    const closeTime = this.convertTo24Hour(Close);

    // Generate time slots in 1-hour intervals
    let currentTime = openTime;
    while (currentTime < closeTime) {
      timeSlots.push(this.convertTo12Hour(currentTime));
      currentTime += 1;
    }

    return timeSlots;
  }

  // Convert 12-hour format (AM/PM) to 24-hour format (HH:mm)
  convertTo24Hour(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = time.includes('PM');
    const convertedHours = isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours;
    return convertedHours + minutes / 60;
  }

  // Convert 24-hour format (HH:mm) to 12-hour format with AM/PM
  convertTo12Hour(time: number): string {
    const hours = Math.floor(time);
    const minutes = (time - hours) * 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes < 10 ? '00' : minutes} ${period}`;
  }
}
