const MOCKED_CLAIMS = {
  type: 'vKYC', // its a type of the given node, but not a datapoint itself
  emailAddress: 'liz.lemon@30rock.com',
  phoneNumber: '+1',
  firstName: 'Liz',
  lastName: 'Lemon',
  birthDate: '1970-11-27',
  birthPlace: 'PENNSYLVANIA, USA',
  nationality: 'UNITED STATES OF AMERICA',
  socialSecurityNumber: '123-45-6789',
  registrationAddressDetails: {
    type: 'RegistrationAddressDetails', // its a type of the given node, but not a datapoint itself
    country: 'USA',
    region: 'New York',
    postalCode: '10024',
    locality: 'New York',
    streetAddress: '168 Riverside Drive, APT 2F',
  },
};

export default MOCKED_CLAIMS;
