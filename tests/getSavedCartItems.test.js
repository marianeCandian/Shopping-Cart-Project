const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se saveCartItems é uma função', () => {{
    expect(typeof getSavedCartItems).toBe('function');
  }});

  it('Testa se ao executar a função, o método localStorage é chamado', () =>{
    getSavedCartItems('cartItems')
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Testa se ao executar a função, o método é chamado co  dois parâmetros, sendo o primeiro "cartItem"', () => {
    getSavedCartItems('cartItems')
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
