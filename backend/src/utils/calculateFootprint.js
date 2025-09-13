// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  car: 0.12, // per km
  domesticFlight: 0.18, // per km
  internationalFlight: 0.2, // per km
  publicTransport: 0.04, // per km
  electricity: 0.5, // per kWh (varies by region/source)
  heating: 2.3, // per liter of heating oil
  diet: {
    vegan: 1000, // annual base CO2
    vegetarian: 1500,
    lightMeat: 2500,
    moderateMeat: 3500,
    heavyMeat: 5000
  }
};

/**
 * Calculate carbon footprint based on lifestyle inputs
 * @param {Object} inputs - User lifestyle inputs
 * @param {Object} inputs.transport - Transportation data in km
 * @param {Object} inputs.energy - Energy usage data
 * @param {string} inputs.dietType - Diet type
 * @returns {Object} Score and feedback
 */
function calculateFootprint(inputs) {
  const {
    transport = {},
    energy = {},
    dietType = 'moderateMeat'
  } = inputs;

  // Calculate transport emissions
  const transportEmissions = (
    (transport.car || 0) * EMISSION_FACTORS.car +
    (transport.domesticFlights || 0) * EMISSION_FACTORS.domesticFlight +
    (transport.internationalFlights || 0) * EMISSION_FACTORS.internationalFlight +
    (transport.publicTransport || 0) * EMISSION_FACTORS.publicTransport
  );

  // Calculate energy emissions
  const renewableRatio = (energy.renewablePercentage || 0) / 100;
  const energyEmissions = (
    ((energy.electricity || 0) * (1 - renewableRatio) * EMISSION_FACTORS.electricity) +
    ((energy.heatingOil || 0) * EMISSION_FACTORS.heating)
  );

  // Get base diet emissions (already annual)
  const dietEmissions = EMISSION_FACTORS.diet[dietType] || EMISSION_FACTORS.diet.moderateMeat;

  // Calculate total emissions (monthly)
  const totalEmissions = transportEmissions + energyEmissions + (dietEmissions / 12);

  // Determine feedback based on total annual emissions
  const annualEmissions = totalEmissions * 12;
  let feedback;
  
  if (annualEmissions < 2000) {
    feedback = "Your footprint is lower than average! Great job.";
  } else if (annualEmissions <= 5000) {
    feedback = "Your footprint is around average. There's room to improve.";
  } else {
    feedback = "Your footprint is higher than average. Consider reducing car travel or energy usage.";
  }

  return {
    score: totalEmissions,
    annualScore: annualEmissions,
    feedback
  };
}

module.exports = calculateFootprint;
