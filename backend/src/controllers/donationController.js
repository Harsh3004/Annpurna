const Donation = require('../models/Donation');
const User = require('../models/User');
const { generateDonationCode } = require('../utils/generateCode');

exports.createDonation = async (req, res) => {
  try {
    const donationData = req.body;
    const donationCode = generateDonationCode();

    const donation = new Donation({
      donation_code: donationCode,
      donor: req.user._id,
      meal_name: donationData.mealName,
      meal_type: donationData.mealType,
      food_category: donationData.category,
      quantity: parseFloat(donationData.quantity?.split(' ')[0] || '1'),
      quantity_unit: donationData.quantity?.split(' ')[1] || 'servings',
      cooked_time: donationData.cookedAt ? new Date() : null,
      expiry_time: donationData.bestBefore ? new Date(Date.now() + parseInt(donationData.bestBefore) * 3600000) : null,
      description: donationData.description || '',
      special_instructions: donationData.specialInstructions || '',
      delivery_mode: donationData.deliveryMode,
      pickup_address: donationData.pickupAddress || ''
    });

    await donation.save();

    // Update user stats
    req.user.stats.total_donations += 1;
    req.user.stats.total_meals_donated += donation.quantity;
    req.user.stats.total_co2_saved += donation.quantity * 1.2;
    req.user.stats.total_people_helped += Math.ceil(donation.quantity);
    req.user.stats.total_points += 10;
    req.user.stats.current_level = Math.floor(req.user.stats.total_points / 100) + 1;
    req.user.stats.last_updated = new Date();

    req.user.donations.unshift(donation._id);
    await req.user.save();

    res.json({ donation, donationCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create donation' });
  }
};
