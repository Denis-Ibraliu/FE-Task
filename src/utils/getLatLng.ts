type GetGeocodingParams = {
  address: string;
  city: string;
  zipcode: string;
};

/**
 * Simulates getting address components
 */
async function getLatLng(params: GetGeocodingParams) {
  return Promise.resolve({
    ...params,
    street: params.address,
    suite: "",
    geo: {
      lat: "" + Math.random() * 100,
      lng: "" + Math.random() * 100,
    },
  });
}

export default getLatLng;
