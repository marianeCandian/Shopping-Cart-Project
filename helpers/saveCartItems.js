const saveCartItems = (valor) => {
  localStorage.setItem('cartItems', valor);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
