export const parseHotels = (hotels) => {
  return hotels.reduce((offers, offer) => {
    if (offers.has(offer.city.name)) {
      offers.get(offer.city.name).offers.push(offer);
    } else {
      offers.set(offer.city.name, {
        city: offer.city.name,
        cityCoordinates: {
          coordinates: [offer.city.location.latitude, offer.city.location.longitude],
          zoom: offer.city.location.zoom,
        },
        offers: [offer]
      });
    }
    return offers;
  }, new Map());
};
