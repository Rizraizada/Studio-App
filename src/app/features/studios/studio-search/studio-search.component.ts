import { Component, EventEmitter, Output } from '@angular/core';
import { StudioService } from '../../../core/services/studio.service';

@Component({
  selector: 'app-studio-search',
  templateUrl: './studio-search.component.html',
  styleUrls: ['./studio-search.component.scss']
})
export class StudioSearchComponent {
  @Output() search = new EventEmitter<string>();
  @Output() radiusSearch = new EventEmitter<{ lat: number, lng: number, radius: number }>();

  searchQuery: string = '';
  locationSuggestions: string[] = [];
  radius: number = 10;
  userLocation: { lat: number, lng: number } | null = null;
  locationError: string = '';

  constructor(private studioService: StudioService) {}

  ngOnInit() {
    this.getUserLocation();
  }

  // Handle search input change
  onSearchQueryChange(): void {
    if (this.searchQuery.length > 2) {
      this.getLocationSuggestions(this.searchQuery);
    } else {
      this.locationSuggestions = [];
    }
  }

  // Fetch location suggestions (Mock API or real)
  getLocationSuggestions(query: string): void {
    this.studioService.getLocationSuggestions(query).subscribe(
      (locations: any) => {
        this.locationSuggestions = locations;
      },
      (error) => {
        console.error('Error fetching location suggestions:', error);
      }
    );
  }

  // Select a location and trigger search
  onLocationSelect(location: string): void {
    this.searchQuery = location;
    this.locationSuggestions = [];
    this.search.emit(this.searchQuery);
  }

  // Trigger radius search
  onRadiusSearch(): void {
    if (this.userLocation) {
      this.radiusSearch.emit({
        lat: this.userLocation.lat,
        lng: this.userLocation.lng,
        radius: this.radius
      });
    } else {
      this.locationError = "User location not available.";
    }
  }

  // Get user's current location
  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        (error) => {
          console.error('Geolocation error', error);
          this.locationError = 'Location access denied or unavailable.';
        }
      );
    } else {
      this.locationError = 'Geolocation is not supported by this browser.';
    }
  }
}
