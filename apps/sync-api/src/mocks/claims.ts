const MOCKED_CLAIMS = {
  type: 'FinancialCredential', // its a type of the given node, but not a datapoint itself
  firstName: 'Liz',
  lastName: 'Lemon',
  birthDate: '1970-11-27',
  nationality: 'US',
  socialSecurityNumber: '123-45-6789',
  emailAddress: 'alex+consumer+local+1@getportabl.com',
  phoneNumber: '+380668988441',
  residentialAddress: {
    type: 'ResidentialAddress', // its a type of the given node, but not a datapoint itself
    streetAddress: '168 Riverside Drive, APT 2F',
    locality: 'New York',
    region: 'NY',
    postalCode: '10024',
    country: 'US',
  },
};

export default MOCKED_CLAIMS;
