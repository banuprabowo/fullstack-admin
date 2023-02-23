import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    /** Hardcode Value */
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /*Recent Transaction */

    const transaction = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /**
     * Overall stats
     */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transaction,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
