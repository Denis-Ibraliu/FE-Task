export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface FormValues {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNr: string;
  address: string;
  city: string;
  zipCode: string;
}
