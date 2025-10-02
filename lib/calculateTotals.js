const calculateTotals = (incomeRecords, expenseRecords) => {
    const total_income = incomeRecords.reduce((sum, r) => sum + r.amount, 0);
    const total_expenses = expenseRecords.reduce((sum, r) => sum + r.amount, 0);

    const categories = ['savings', 'needs', 'wants', 'investments'];
    const totalsByCategory = categories.reduce((categoryTotals, categoryName) => {
        categoryTotals[categoryName] = {
            total: 0,
            subcategories: {}
        };
        expenseRecords.forEach(expenseRecord => {
            if (expenseRecord.category === categoryName) {
                categoryTotals[categoryName].total += expenseRecord.amount;

                if (expenseRecord.sub_category_id && expenseRecord.sub_category_id.sub_cat_name) {
                    const subCategoryName = expenseRecord.sub_category_id.sub_cat_name;

                    categoryTotals[categoryName].subcategories[subCategoryName] =
                        (categoryTotals[categoryName].subcategories[subCategoryName] || 0) + expenseRecord.amount;
                }
            }
        });
        return categoryTotals;
    }, {});


    return {
        total_income,
        total_expenses,
        total_balance: total_income - total_expenses,
        ...totalsByCategory
    };
};

module.exports = calculateTotals;
