export interface Studio {
  Id: number;
  Name: string;
  Type: string;
  Location: LocationDetails;
  Contact: ContactDetails;
  Amenities: string[];
  Description: string;
  PricePerHour: number;
  Currency: string;
  Availability: Availability;
  Rating: number; // Added property for rating (1-5 stars)
}

export interface LocationDetails {
  City: string;
  Area: string;
  Address: string;
  Coordinates: Coordinates;
}

export interface Coordinates {
  Latitude: number;
  Longitude: number;
}

export interface ContactDetails {
  Phone: string;
  Email: string;
}

export interface Availability {
  Open: string;
  Close: string;
}
