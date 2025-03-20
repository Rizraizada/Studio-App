import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Studio } from '../../../core/models/studio.model';

@Component({
  selector: 'app-studio-card',
  templateUrl: './studio-card.component.html',
  styleUrls: ['./studio-card.component.scss']
})
export class StudiosCardComponent {
  @Input() studio!: Studio;
  @Output() book = new EventEmitter<Studio>();

  ngOnInit(): void {
    console.log('Studio data:', this.studio); // Log the studio data
  }

  onBook(): void {
    this.book.emit(this.studio);
  }
}
