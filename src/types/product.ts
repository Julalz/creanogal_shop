export type ProductFinish = {
  id: string;
  label: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  price: number;
  priceFrom?: boolean;
  finishes?: ProductFinish[];
  infoHref: string;
  configureHref: string;
};
