const fetchProducts = async (produtos) => {
 try {
  if (!produtos) {
    throw new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produtos}`;
  const pegaAPI = await fetch(url);
  const transformaJson = await pegaAPI.json();
  // console.log(transformaJson);
  return transformaJson;
} catch (error) {
  return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
