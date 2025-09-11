const generateDonationCode = () => `DN${Date.now().toString().slice(-6)}`;

module.exports = { generateDonationCode };
