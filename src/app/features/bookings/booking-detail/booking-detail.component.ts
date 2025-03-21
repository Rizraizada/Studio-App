import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  booking: Booking | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the route parameters
    const bookingId = +this.route.snapshot.paramMap.get('id')!;
    this.booking = this.bookingService.getBookings().find(b => b.Id === bookingId) || null;
  }
}
