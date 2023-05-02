import { writable } from "svelte/store";

export const product = writable([]);

export const fetchProduct = async (/** @type {string} */ id) => {
    const response = await fetch("https://pira-ata-com-api-rest.onrender.com/api/product/get/" + id);
    const data = await response.json();
    product.set(data);
}