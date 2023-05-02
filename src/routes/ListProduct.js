import { writable } from "svelte/store";

export const products = writable([]);

export const fetchProducts = async () => {
    const response = await fetch("https://pira-ata-com-api-rest.onrender.com/api/product/list");
    const data = await response.json();
    products.set(data);
}