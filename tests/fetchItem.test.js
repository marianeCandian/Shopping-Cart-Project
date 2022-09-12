require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Conferindo se a função fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se a função, ao ser chamada com o argumento "MLB1615760527", o fetch foi chamado', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se a função utiliza o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(url);
  });

  it('Testa se a função, ao ser chamanda com o argumento "MLB1615760527", retorna o objeto de item', async () => {
    expect(await fetchItem("MLB1615760527")).toEqual(item);
  });

  it('Testa se a função ao ser chamada sem argumento, retorna um erro', async () => {
    expect(await fetchItem()).toEqual(Error('You must provide an url'));
  });
});
