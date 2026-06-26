export interface Product {
  id: number;
  title: string;
  imageSrc: string;
}

export const workedProducts: Product[] = [
  { id: 1, title: "DESIGNER T-SHIRT", imageSrc: "/images/product_red_tshirt.png" },
  { id: 2, title: "TRACK SUIT", imageSrc: "/images/product_orange_tracksuit.png" },
  { id: 3, title: "DESIGNER TRACK SUITS", imageSrc: "/images/product_blue_tracksuit.png" },
  { id: 4, title: "DESIGNER T-SHIRT", imageSrc: "/images/product_red_tshirt.png" },
];

export const regularProducts: Product[] = [
  { id: 1, title: "DESIGNER T-SHIRTS", imageSrc: "/images/product_red_longsleeve.png" },
  { id: 2, title: "SLIM FIT DESIGNER POLO", imageSrc: "/images/product_white_polo.png" },
  { id: 3, title: "LOWER", imageSrc: "/images/product_black_pants.png" },
  { id: 4, title: "SLIM FIT DESIGNER POLO", imageSrc: "/images/product_white_polo.png" },
];
