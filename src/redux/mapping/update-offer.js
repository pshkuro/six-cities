export const updateOffer = (cities, id, newOffer) => {
  const cityOffers = cities.find((city) => city.offers.find((offer) => offer.id === id));

  const newCities = cities.map((city) => {
    return city === cityOffers
      ? Object.assign({}, city, {
        offers: newOffer
          ? city.offers.map((offer) => offer.id === id ? newOffer : offer)
          : city.offers.filter((offer) => offer.id !== id)
      })
      : city;
  });

  return newCities.filter((city) => city.offers.length > 0);
};
