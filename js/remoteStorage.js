const STORAGE_TOKEN = 'L12UFY9BAT0AZMLLBX5DBJ1S938BG7NTXIRW92EP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Stores a key-value pair in a remote storage
 * @param {String} key - The key under which the value is stored. 
 * @param {Any} value - The value to be stored. 
 * @returns {Promise<Object>} - The response from the server as a JSON object.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


/**
 * Retrieves a value from remote the remote storage using a key.
 * @param {String} key - The key for which the value is to be retrieved. 
 * @returns {Promise<any>} - The value associated with the provided key.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
    .then(res => res.json())
    //.then(console.log(res))
    .then(res => res.data.value)
}