export const data : StoreItem[] = [{productId: 1, name: "Dog Food", price: 4.99}, {productId: 2, name: "Cat Scratching Post", price:14.99}];


interface StoreItem{
    productId: number,
    name : string,
    price: number,
    discountPrice? : number

}