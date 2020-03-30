export const MAIN_PROXY_URL = "https://api.covid19api.com"

export const summaryURL = `${MAIN_PROXY_URL}/summary`;
export const countriesURL = `${MAIN_PROXY_URL}/countries`;

export const getCountrySummary = (country = "vietnam", status = "confirmed") => {
    return `${MAIN_PROXY_URL}/country/${country}/status/${status}`;
}