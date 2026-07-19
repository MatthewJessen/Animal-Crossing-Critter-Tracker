export async function getAllCritters() {
    const bugRes = await fetch(`/api/proxy/nh/bugs`, { method: "GET", headers: { "Content-Type": "application/json", "X-API-KEY": "ea3cf354-39d1-447d-aaf5-64ec96d7f4b7" }});
    const bugBody = await bugRes.json();

    const fishRes = await fetch(`/api/proxy/nh/fish`, { method: "GET", headers: { "Content-Type": "application/json", "X-API-KEY": "ea3cf354-39d1-447d-aaf5-64ec96d7f4b7" }});
    const fishBody = await fishRes.json();

    return [bugBody, fishBody];
}