require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Conferindo se a função fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it ('Testa se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se a função utiliza o endpoint correto', async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  });

  it('Testa se a função retorna o objeto importado', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('Testa se a função ao ser chamada sem argumento, retorna um erro', async () => {
    expect(await fetchProducts()).toEqual(Error('You must provide an url'));
  });
});
