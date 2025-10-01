const builDateFilter = (days) => {
    if (!days || days === "all") return {};

    const numDays = parseInt(days, 10);
    if (!isNaN(numDays)) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - numDays);
        endDate.setHours(23, 59, 59, 999);
        startDate.setHours(0, 0, 0, 0);
        return dateFilter = { date: { $gte: startDate, $lte: endDate } };
    }
}

module.exports = builDateFilter;