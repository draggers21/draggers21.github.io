export async function fetch_meta_data(meta_data_location) {
    try {
        let response = await fetch(meta_data_location);
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
