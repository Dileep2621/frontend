import axios from "axios";

// Function to fetch data
export const fetchCities = async (
  name: string,
  limit: number,
  offset: number
) => {
  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    params: {
      limit: limit,
      offset: offset,
      namePrefix: name,
      namePrefixDefaultLangResults: "true",
    },
    headers: {
      "x-rapidapi-key": "6aa58e5e78mshb9d37ad7da4bb2cp14c130jsne9f06ac6a175",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
