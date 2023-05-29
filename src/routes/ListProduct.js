import { writable } from "svelte/store";
import { API_URL } from "./config";

export const products = writable([]);

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/api/product/list`);
    const data = await response.json();

    let newArray = data.slice();

    for (var i = newArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }

    products.set(newArray);
}