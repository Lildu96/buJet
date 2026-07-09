const API_URL = "http://127.0.0.1:8000";
export default API_URL;

export async function getLibrary() {
    const response = await fetch(`${API_URL}/library`);

    if (!response.ok) {
        throw new Error("Failed to load library");
    }

    return await response.json();
}

export async function resetData() {
    const response = await fetch(`${API_URL}/reset-data`, {
        method: "POST",
    });

    if(!response.ok){
        throw new Error("Failed to reset data");
    }

    const data = await response.json();
    console.log(data);

    return data
}

type ExpenseData = {
    amount: number;
    description: string;
    category: string;
    createdAt: string;
}

type IncomeData = {
    amount: number;
    category: string;
    createdAt: string;
}

export async function addIncome(income: IncomeData) {
    const response = await fetch(`${API_URL}/income`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(income),
    });

    if (!response.ok) {
        throw new Error("Failed to add income");
    }
    const data = await response.json();
    return data
}

export async function addExpense(expense: ExpenseData) {
    const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });

    if (!response.ok) {
        throw new Error("Failed to add expense");
    }

    const data = await response.json();
    return data
}