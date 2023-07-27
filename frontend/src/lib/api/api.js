import client from './client';

// get hospital list
export const getHospitalList = () => {
  return client.get(`/api/hospitalList`);
};

// update hospital list
export const updateHospitalList = ({ hospitalId, latitude, longitude }) => {
  return client.put(`/api/hospitalList/${hospitalId}`, {
    latitude,
    longitude,
  });
};

// get random dog picture
export const getRandomDogPicture = () => {
  return client.get('/api/randomDogPicture');
};
