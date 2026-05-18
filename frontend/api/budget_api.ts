const API_URL = "http://127.0.0.1:8000";

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