export interface Product{
    name: String;
    imagePath: [String];
    description: Number;
    discountPercent: Number;
    availableQuantity: Number;
    price: Number;
    category: String;
    seller: String;
    reviews: [String];
    isTrending: Boolean;
    isDiscounted: Boolean;
    offers: [String];
    sizes: [String];
    colors: [String];
    averageRating: Number;  
}