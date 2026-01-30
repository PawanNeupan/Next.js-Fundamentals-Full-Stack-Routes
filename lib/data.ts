export type Product = {
  id: string
  name: string
  price: number
  image: string   // 👈 add this
}

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 14",
    price: 999,
    image: "/images/iphone14.jpg",
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    price: 899,
    image: "/images/Samsung Galaxy S23.jpg",
  },
  {
    id: "3",
    name: "Pixel 8",
    price: 799,
    image: "/images/Pixel 8.jpg",
  },
  {
    id: "4",
    name: "AirPods",
    price: 199,
    image: "/images/AirPods.jpg",
  },
]

export async function getProducts(search?: string): Promise<Product[]> {
  if (!search) return products;
  return products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}