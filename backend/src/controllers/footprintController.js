const calculateFootprint = require('../utils/calculateFootprint');

const footprintController = {
  /**
   * Calculate carbon footprint based on user inputs
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  calculateFootprint: async (req, res) => {
    try {
      const { transport, energy, dietType } = req.body;

      // Validate required inputs
      if (!transport || !energy || !dietType) {
        return res.status(400).json({
          success: false,
          message: 'Missing required inputs'
        });
      }

      // Calculate footprint
      const result = calculateFootprint({
        transport,
        energy,
        dietType
      });

      return res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {
      console.error('Error calculating footprint:', error);
      return res.status(500).json({
        success: false,
        message: 'Error calculating carbon footprint'
      });
    }
  }
};

module.exports = footprintController;
