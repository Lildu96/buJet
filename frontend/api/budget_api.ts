const API_URL = "http://127.0.0.1:8000";

export async function resetData() {
    const response = await fetch(`${API_URL}/reset-data`, {
        method: "POST",
    });

    const data = await response.json();

    console.log(data);

    return data
}