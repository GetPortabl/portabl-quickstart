const MOCKED_CLAIMS = {
  type: 'FinancialCredential', // its a type of the given node, but not a datapoint itself
  firstName: 'Liz',
  lastName: 'Lemon',
  birthDate: '1970-11-27',
  nationality: 'US',
  socialSecurityNumber: '123-45-6789',
  emailAddress: 'liz.lemon@30rock.com',
  phoneNumber: '+1 212 456 7890',
  residentialAddress: {
    type: 'ResidentialAddress', // its a type of the given node, but not a datapoint itself
    streetAddress: '168 Riverside Drive, APT 2F',
    locality: 'New York',
    region: 'New York',
    postalCode: '10024',
    country: 'USA',
  },
};

export default MOCKED_CLAIMS;
