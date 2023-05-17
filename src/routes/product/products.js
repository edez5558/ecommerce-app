import { writable } from "svelte/store";
import { API_URL } from "../config";

export const product = writable([]);

export const seller= writable();

export const fetchProduct = async (/** @type {string} */ id) => {
    const response = await fetch(`${API_URL}/api/product/get/` + id);
    const data = await response.json();

    const responseName = await fetch(`${API_URL}/api/product/get/${id}/user/name`);
    const dataName = await responseName.text();

    seller.set(dataName.replaceAll('"',''));
    console.log(data);
    product.set(data);
}