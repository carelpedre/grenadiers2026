// Where Haitians gather — a directory of Haitian-frequented venues worldwide.
// Bars, restaurants, community centers, cultural spaces. Not a watch party list —
// hosts are responsible for any FIFA Public Viewing licenses they may need.
//
// All entries are TBD placeholders, to be filled with real venues over time.
// This is a community directory, not an endorsement of any specific gathering.

export const watchPartyRegions = [
  {
    id: "us-northeast",
    name: "United States — Northeast",
    note: "The largest Haitian-American populations are in the Northeast — New York, Massachusetts, New Jersey. Where Haitians have always gathered.",
    parties: [
      { city: "Brooklyn, NY", area: "Flatbush", venue: "TBD venue", type: "Haitian restaurant", lat: 40.6402, lng: -73.9614 },
      { city: "Brooklyn, NY", area: "East Flatbush", venue: "TBD venue", type: "Bar", lat: 40.6510, lng: -73.9335 },
      { city: "Queens, NY", area: "Queens", venue: "TBD venue", type: "Community space", lat: 40.7282, lng: -73.7949 },
      { city: "Spring Valley, NY", venue: "TBD venue", type: "Haitian restaurant", lat: 41.1126, lng: -74.0438 },
      { city: "Boston, MA", area: "Mattapan", venue: "TBD venue", type: "Cultural center", lat: 42.2683, lng: -71.0915, featured: true },
      { city: "Boston, MA", area: "Dorchester", venue: "TBD venue", type: "Haitian restaurant", lat: 42.2989, lng: -71.0668 },
      { city: "Brockton, MA", venue: "TBD venue", type: "Bar", lat: 42.0834, lng: -71.0184 },
      { city: "Newark, NJ", venue: "TBD venue", type: "Haitian restaurant", lat: 40.7357, lng: -74.1724 },
      { city: "Elizabeth, NJ", venue: "TBD venue", type: "Community space", lat: 40.6640, lng: -74.2107 },
      { city: "Philadelphia, PA", venue: "TBD venue", type: "Haitian restaurant", lat: 39.9526, lng: -75.1652, featured: true },
    ],
  },
  {
    id: "us-south",
    name: "United States — South",
    note: "Florida and Georgia hold some of the largest Haitian communities in the United States — Miami's Little Haiti, North Miami, Atlanta's growing diaspora.",
    parties: [
      { city: "Miami, FL", area: "Little Haiti", venue: "TBD venue", type: "Cultural center", lat: 25.8276, lng: -80.1956, featured: true },
      { city: "Miami, FL", area: "North Miami", venue: "TBD venue", type: "Haitian restaurant", lat: 25.8901, lng: -80.1867 },
      { city: "Fort Lauderdale, FL", venue: "TBD venue", type: "Bar", lat: 26.1224, lng: -80.1373 },
      { city: "Tamarac / Sunrise, FL", venue: "TBD venue", type: "Haitian restaurant", lat: 26.1568, lng: -80.2997 },
      { city: "Orlando, FL", venue: "TBD venue", type: "Community space", lat: 28.5383, lng: -81.3792 },
      { city: "Naples, FL", venue: "TBD venue", type: "Haitian restaurant", lat: 26.1420, lng: -81.7948 },
      { city: "Atlanta, GA", venue: "TBD venue", type: "Cultural center", lat: 33.7490, lng: -84.3880, featured: true },
    ],
  },
  {
    id: "us-other",
    name: "United States — Midwest & West",
    parties: [
      { city: "Chicago, IL", venue: "TBD venue", type: "Haitian restaurant", lat: 41.8781, lng: -87.6298 },
      { city: "Houston, TX", venue: "TBD venue", type: "Bar", lat: 29.7604, lng: -95.3698 },
      { city: "Washington, DC", venue: "TBD venue", type: "Community space", lat: 38.9072, lng: -77.0369 },
      { city: "Los Angeles, CA", venue: "TBD venue", type: "Haitian restaurant", lat: 34.0522, lng: -118.2437 },
    ],
  },
  {
    id: "canada",
    name: "Canada",
    note: "Montréal holds the largest French-speaking Haitian community outside Haiti.",
    parties: [
      { city: "Montréal, QC", area: "Saint-Michel", venue: "TBD venue", type: "Haitian restaurant", lat: 45.5588, lng: -73.6175, featured: true },
      { city: "Montréal, QC", area: "Montréal-Nord", venue: "TBD venue", type: "Bar", lat: 45.6066, lng: -73.6275 },
      { city: "Laval, QC", venue: "TBD venue", type: "Cultural center", lat: 45.6066, lng: -73.7124 },
      { city: "Ottawa, ON", venue: "TBD venue", type: "Haitian restaurant", lat: 45.4215, lng: -75.6972 },
      { city: "Toronto, ON", venue: "TBD venue", type: "Bar", lat: 43.6532, lng: -79.3832 },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    parties: [
      { city: "Paris, France", venue: "TBD venue", type: "Haitian restaurant", lat: 48.8566, lng: 2.3522 },
      { city: "Lyon, France", venue: "TBD venue", type: "Cultural center", lat: 45.7640, lng: 4.8357 },
      { city: "Brussels, Belgium", venue: "TBD venue", type: "Bar", lat: 50.8503, lng: 4.3517 },
      { city: "London, UK", venue: "TBD venue", type: "Haitian restaurant", lat: 51.5074, lng: -0.1278 },
    ],
  },
  {
    id: "caribbean",
    name: "Caribbean & Latin America",
    parties: [
      { city: "Santo Domingo, DR", venue: "TBD venue", type: "Haitian restaurant", lat: 18.4861, lng: -69.9312 },
      { city: "Nassau, Bahamas", venue: "TBD venue", type: "Haitian restaurant", lat: 25.0343, lng: -77.3963 },
      { city: "Santiago, Chile", venue: "TBD venue", type: "Community space", lat: -33.4489, lng: -70.6693 },
      { city: "São Paulo, Brazil", venue: "TBD venue", type: "Bar", lat: -23.5505, lng: -46.6333 },
    ],
  },
  {
    id: "haiti",
    name: "Haiti — All 10 departments",
    note: "Haitian-frequented venues across every department of Haiti — from Pétion-Ville to Cap-Haïtien, Les Cayes to Hinche.",
    parties: [
      { city: "Port-au-Prince", area: "Ouest", venue: "TBD venue", type: "Cultural center", lat: 18.5944, lng: -72.3074, featured: true },
      { city: "Pétion-Ville", area: "Ouest", venue: "TBD venue", type: "Bar", lat: 18.5128, lng: -72.2855 },
      { city: "Cap-Haïtien", area: "Nord", venue: "TBD venue", type: "Cultural center", lat: 19.7592, lng: -72.2017, featured: true },
      { city: "Gonaïves", area: "Artibonite", venue: "TBD venue", type: "Haitian restaurant", lat: 19.4515, lng: -72.6890 },
      { city: "Les Cayes", area: "Sud", venue: "TBD venue", type: "Community space", lat: 18.1900, lng: -73.7500 },
      { city: "Jérémie", area: "Grand'Anse", venue: "TBD venue", type: "Bar", lat: 18.6500, lng: -74.1167 },
      { city: "Jacmel", area: "Sud-Est", venue: "TBD venue", type: "Haitian restaurant", lat: 18.2342, lng: -72.5343 },
      { city: "Port-de-Paix", area: "Nord-Ouest", venue: "TBD venue", type: "Community space", lat: 19.9417, lng: -72.8333 },
      { city: "Fort-Liberté", area: "Nord-Est", venue: "TBD venue", type: "Bar", lat: 19.6667, lng: -71.8500 },
      { city: "Hinche", area: "Centre", venue: "TBD venue", type: "Community space", lat: 19.1500, lng: -72.0000 },
      { city: "Miragoâne", area: "Nippes", venue: "TBD venue", type: "Haitian restaurant", lat: 18.4439, lng: -73.0903 },
    ],
  },
];

export const watchPartyStats = {
  cities: 45,
  countries: 8,
  haitiDepartments: 10,
};

// Flatten all venues into one array for easy map iteration
export function getAllParties() {
  return watchPartyRegions.flatMap((r) =>
    r.parties.map((p) => ({ ...p, region: r.name, regionId: r.id }))
  );
}
