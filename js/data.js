// ============================================
// DUMMY CAR DATA
// ============================================

const carsData = [
  {
    id: 1,
    title: "2023 Tesla Model 3",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 3500000,
    mileage: 24140,
    fuelType: "Electric",
    transmission: "Automatic",
    color: "Pearl White Multi-Coat",
    engine: "Dual Motor",
    horsepower: 358,
    topSpeed: 201,
    image: "assets/images/cars/Tesla.jpeg",
    description: "Sleek and efficient electric sedan with advanced autopilot features. Perfect for daily commuting and long-distance travel.",
    features: [
      "Autopilot",
      "Premium Audio System",
      "15-inch Touchscreen",
      "Supercharging Compatible",
      "All-Wheel Drive"
    ],
    owner: "John Smith",
    ownerPhone: "+91-98765-43210",
    ownerEmail: "john.smith@email.com",
    location: "Bangalore",
    interior: "Premium White Interior",
    exteriorCondition: "Excellent",
    serviceHistory: "Full Tesla Service Records"
  },
  {
    id: 2,
    title: "2022 BMW X5",
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: 5400000,
    mileage: 45062,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Arctic White",
    engine: "3.0L Twin-Turbo",
    horsepower: 335,
    topSpeed: 209,
    image: "assets/images/cars/bmw.jpg",
    description: "Luxury SUV with premium interior, advanced technology, and powerful performance. Ideal for families and off-road adventures.",
    features: [
      "iDrive System",
      "Panoramic Sunroof",
      "Leather Interior",
      "Adaptive Headlights",
      "Premium Sound System"
    ],
    owner: "Sarah Johnson",
    ownerPhone: "+91-98765-43211",
    ownerEmail: "sarah.j@email.com",
    location: "Mumbai",
    interior: "Leather Brown Interior",
    exteriorCondition: "Excellent",
    serviceHistory: "BMW Certified Pre-Owned"
  },
  {
    id: 3,
    title: "2023 Honda Civic",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 2300000,
    mileage: 12874,
    fuelType: "Petrol",
    transmission: "CVT",
    color: "Sonic Gray Pearl",
    engine: "2.0L",
    horsepower: 158,
    topSpeed: 180,
    image: "assets/images/cars/honda.jpeg",
    description: "Reliable and fuel-efficient sedan with modern features and safety technology. Perfect for first-time buyers.",
    features: [
      "Honda Sensing",
      "Bluetooth Connectivity",
      "Backup Camera",
      "Keyless Entry",
      "Apple CarPlay"
    ],
    owner: "Michael Chen",
    ownerPhone: "+91-98765-43212",
    ownerEmail: "m.chen@email.com",
    location: "Delhi",
    interior: "Black Fabric Interior",
    exteriorCondition: "Like New",
    serviceHistory: "Regular Maintenance Records"
  },
  {
    id: 4,
    title: "2021 Audi A4",
    brand: "Audi",
    model: "A4",
    year: 2021,
    price: 3150000,
    mileage: 72420,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Cosmos Black",
    engine: "2.0L TFSI",
    horsepower: 261,
    topSpeed: 209,
    image: "assets/images/cars/Audi.avif",
    description: "German engineering at its finest. Premium sedan with excellent handling and luxury features.",
    features: [
      "MMI Navigation",
      "Virtual Cockpit",
      "Bang & Olufsen Sound",
      "Quattro AWD",
      "LED Headlights"
    ],
    owner: "Emma Wilson",
    ownerPhone: "+91-98765-43213",
    ownerEmail: "emma.w@email.com",
    location: "Pune",
    interior: "Leather Black Interior",
    exteriorCondition: "Excellent",
    serviceHistory: "Audi Service Records"
  },
  {
    id: 5,
    title: "2022 Toyota Camry",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 2650000,
    mileage: 51498,
    fuelType: "Hybrid",
    transmission: "CVT",
    color: "Blueprint Blue",
    engine: "2.5L Hybrid",
    horsepower: 208,
    topSpeed: 180,
    image: "assets/images/cars/toyota.jpeg",
    description: "Fuel-efficient hybrid sedan with Toyota reliability. Great for eco-conscious drivers.",
    features: [
      "Hybrid System",
      "Toyota Safety Sense",
      "Climate Control",
      "Steering Wheel Controls",
      "Bluetooth Audio"
    ],
    owner: "Robert Martinez",
    ownerPhone: "+91-98765-43214",
    ownerEmail: "r.martinez@email.com",
    location: "Hyderabad",
    interior: "Gray Fabric Interior",
    exteriorCondition: "Good",
    serviceHistory: "Regular Toyota Service"
  },
  {
    id: 6,
    title: "2023 Volkswagen Golf",
    brand: "Volkswagen",
    model: "Golf",
    year: 2023,
    price: 2150000,
    mileage: 8047,
    fuelType: "Petrol",
    transmission: "Manual",
    color: "Deep Black Pearl",
    engine: "1.5L TSI",
    horsepower: 130,
    topSpeed: 200,
    image: "assets/images/cars/vw.jpeg",
    description: "Classic hatchback with modern technology. Nimble and fun to drive in urban environments.",
    features: [
      "MIB3 Infotainment",
      "Bluetooth Connectivity",
      "Cruise Control",
      "Rear Parking Sensors",
      "LED Lights"
    ],
    owner: "Lisa Anderson",
    ownerPhone: "+91-98765-43215",
    ownerEmail: "l.anderson@email.com",
    location: "Ahmedabad",
    interior: "Black Cloth Interior",
    exteriorCondition: "Excellent",
    serviceHistory: "VW Certified Records"
  },
  {
    id: 7,
    title: "2020 Ford Mustang",
    brand: "Ford",
    model: "Mustang",
    year: 2020,
    price: 2900000,
    mileage: 88514,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Race Red",
    engine: "3.7L V6",
    horsepower: 290,
    topSpeed: 217,
    image: "assets/images/cars/ford.jpeg",
    description: "American muscle car with iconic styling and thrilling performance.",
    features: [
      "Performance Package",
      "Sync 3 Infotainment",
      "Backup Camera",
      "Sport Suspension",
      "Custom Wheels"
    ],
    owner: "David Brown",
    ownerPhone: "+91-98765-43216",
    ownerEmail: "d.brown@email.com",
    location: "Chandigarh",
    interior: "Black Leather Interior",
    exteriorCondition: "Good",
    serviceHistory: "Ford Service Records"
  },
  {
    id: 8,
    title: "2023 Mazda CX-5",
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 2500000,
    mileage: 19312,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Zircon Sand",
    engine: "2.5L",
    horsepower: 187,
    topSpeed: 193,
    image: "assets/images/cars/mazda.png",
    description: "Compact SUV combining style, comfort, and reliability. Perfect for adventure seekers.",
    features: [
      "i-Activsense",
      "Apple CarPlay",
      "Panoramic Sunroof",
      "AWD",
      "Premium Audio"
    ],
    owner: "Jennifer White",
    ownerPhone: "+91-98765-43217",
    ownerEmail: "j.white@email.com",
    location: "Jaipur",
    interior: "Cream Leather Interior",
    exteriorCondition: "Excellent",
    serviceHistory: "Mazda Service History"
  }
];

// ============================================
// BRANDS LIST
// ============================================
const brands = [
  "All Brands",
  "Tesla",
  "BMW",
  "Honda",
  "Audi",
  "Toyota",
  "Volkswagen",
  "Ford",
  "Mazda",
  "Mercedes-Benz",
  "Porsche"
];

// ============================================
// FUEL TYPES
// ============================================
const fuelTypes = [
  "All Types",
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric"
];

// ============================================
// TRANSMISSION TYPES
// ============================================
const transmissions = [
  "All Transmissions",
  "Manual",
  "Automatic",
  "CVT"
];

// ============================================
// COLORS
// ============================================
const colors = [
  "All Colors",
  "Black",
  "White",
  "Silver",
  "Red",
  "Blue",
  "Gray"
];

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { carsData, brands, fuelTypes, transmissions, colors };
}
