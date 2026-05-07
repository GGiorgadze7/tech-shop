export interface ProductInterface {
  _id: string;
  title: string;
  price: {
    current: number;
    beforeDiscount: number;
    discountPercentage: number;
  };
  warranty: string;
  category: { name: string };
  thumbnail: string;
  rating: number;
  stock: number;
  total: number;
  description: string;
}
