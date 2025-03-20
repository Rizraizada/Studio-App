import { Studio } from './studio.model';

describe('StudioModel', () => {
  it('should create an instance', () => {
    const studio: Studio = {
      id: 1,
      name: 'Dhanmondi Recording Studio 1',
      type: 'Photography',
      location: {
        city: 'Dhaka',
        area: 'Gulshan',
        address: 'House 73, Road 9, Mohammadpur, Dhaka',
        coordinates: {
          latitude: 23.716008,
          longitude: 90.410068,
        },
      },
      contact: {
        phone: '+8801768421018',
        email: 'studio1@example.com',
      },
      amenities: ['Instruments', 'Lighting Equipment', 'Wi-Fi'],
      description: 'A popular Recording Studio studio in Gulshan area.',
      pricePerHour: 1525,
      currency: 'BDT',
      availability: {
        open: '09:00',
        close: '18:00',
      },
    };
    expect(studio).toBeTruthy();
  });
});
