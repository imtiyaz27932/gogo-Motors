import { faker } from '@faker-js/faker';

export const userData = {
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  addressLine1: faker.location.streetAddress(),
  addressLine2: faker.location.secondaryAddress(),
  dateOfBirth: '04/12/2024', 
  country: 'Kingdom of Saudi Arabia',
  region: 'Riyadh',
  city: 'Jeddah', 
  zip: faker.location.zipCode('#####'),
  profession: faker.person.jobTitle(),
  preferredCommunication: ['WhatsApp', 'Email'],
  preferredLanguage: 'English',
};
