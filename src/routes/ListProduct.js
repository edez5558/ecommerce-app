import { writable } from "svelte/store";
import { API_URL } from "./config";

export const products = writable([]);

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/api/product/list`);
    const data = await response.json();
    products.set(data);
}