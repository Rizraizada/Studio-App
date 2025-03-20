import { Component, OnInit } from '@angular/core';
import { Studio } from '../../../core/models/studio.model';
import { StudioService } from '../../../core/services/studio.service'; // Assuming this service fetches the studio data.

@Component({
  selector: 'app-studios',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
  studios: Studio[] = [];
  filteredStudios: Studio[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9; // Adjust number of items per page
  totalPages: number = 1;

  constructor(private studioService: StudioService) {}

  ngOnInit(): void {
    this.studioService.getStudios().subscribe((data: any) => {
      this.studios = data.Studios;
      this.filteredStudios = this.studios; // Assuming no filter applied initially
      this.totalPages = Math.ceil(this.studios.length / this.itemsPerPage);
      this.updateStudiosForCurrentPage();
    });
  }

  // Method to update studios displayed for the current page
  updateStudiosForCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredStudios = this.studios.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateStudiosForCurrentPage();
  }

  onSearch(query: string): void {
    this.filteredStudios = this.studios.filter(studio =>
      studio.Name.toLowerCase().includes(query.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredStudios.length / this.itemsPerPage);
    this.updateStudiosForCurrentPage();
  }

  onBook(studio: Studio): void {
    console.log(`Booking studio: ${studio.Name}`);
    // Implement booking logic here
  }
}
