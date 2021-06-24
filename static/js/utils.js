export function fetch_meta_data(meta_data_location) {
    fetch(meta_data_location)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err)); 
    // return data;
}