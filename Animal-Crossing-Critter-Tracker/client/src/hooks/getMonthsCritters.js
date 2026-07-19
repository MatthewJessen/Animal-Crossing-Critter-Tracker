export async function getMonthsCritters(month = "current") {
    // Get bugs for the month
    const bugRes = await fetch(`/api/proxy/nh/bugs?month=${month}`, { method: "GET", headers: { "Content-Type": "application/json", "X-API-KEY": "ea3cf354-39d1-447d-aaf5-64ec96d7f4b7" } })
    const bugBody = await bugRes.json();
    const monthsBugs = bugBody.north;
      
    // Get fish for the month
    const fishRes = await fetch(`/api/proxy/nh/fish?month=${month}`, { method: "GET", headers: { "Content-Type": "application/json", "X-API-KEY": "ea3cf354-39d1-447d-aaf5-64ec96d7f4b7" } })
    const fishBody = await fishRes.json();
    const monthsFish = fishBody.north;

    return [monthsBugs, monthsFish];
}