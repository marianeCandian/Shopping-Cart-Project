const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Testa se saveCartItems é uma função', () => {{
    expect(typeof saveCartItems).toBe('function');
  }});

  it('Testa se ao executar a função, o método localStorage é chamado', () =>{
    saveCartItems('cartItem')
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Testa se ao executar a função, o método é chamado co  dois parâmetros, sendo o primeiro "cartItem"', () => {
    saveCartItems('cartItem')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  });
});
