export async function getProducts() {
  const results = await fetch("/products.json");
  const products = results.json();
  return products;
}

export async function checkout(items) {
  const modifier = Object.keys(items).length > 0 ? "success" : "error";
  const url = `/checkout-${modifier}.json`;
  await sleep(500);
  const response = await fetch(url);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data;
}

const sleep = (time) => new Promise((res) => setTimeout(res, time));
