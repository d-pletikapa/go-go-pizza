export const cartControl = {
  cartData: JSON.parse(localStorage.getItem('cart') || '[]'),
  addCart(product) {
    this.cartData.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  },
  removeCart(cartProductId) {
    this.cartData = this.cartData.filter(item => item.cartProductId !== cartProductId);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  },
  clearCart() {
    this.cartData = [];
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  },
};