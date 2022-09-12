const fetchItem = async (item) => {
  try {
    if (!item) {
      throw new Error('You must provide an url');
    }
    const url = `https://api.mercadolibre.com/items/${item}`;
    const getItens = await fetch(url);
    const viraJson = await getItens.json();
    return viraJson;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
