import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudiosCardComponent } from './studio-card.component';
import { Studio } from '../../../core/models/studio.model'; // Adjust path if necessary

describe('StudioCardComponent', () => {
  let component: StudiosCardComponent;
  let fixture: ComponentFixture<StudiosCardComponent>;

  const mockStudio: Studio = {
    Id: 1,
    Name: 'Dhanmondi Recording Studio 1',
    Type: 'Photography',
    Location: {
      City: 'Dhaka',
      Area: 'Gulshan',
      Address: 'House 73, Road 9, Mohammadpur, Dhaka',
      Coordinates: {
        Latitude: 23.716008,
        Longitude: 90.410068
      }
    },
    Contact: {
      Phone: '+8801768421018',
      Email: 'studio1@example.com'
    },
    Amenities: ['Instruments', 'Lighting Equipment', 'Wi-Fi'],
    Description: 'A popular Recording Studio studio in Gulshan area.',
    PricePerHour: 1525,
    Currency: 'BDT',
    Availability: {
      Open: '09:00',
      Close: '18:00'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioCardComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioCardComponent);
    component = fixture.componentInstance;
    component.studio = mockStudio;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display studio name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.studio-name').textContent).toContain(mockStudio.Name);
  });

  it('should display studio price', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.studio-price').textContent).toContain(mockStudio.PricePerHour);
  });

  it('should display amenities correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.studio-amenities li').length).toBe(mockStudio.Amenities.length);
  });
});
