// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const sumItems = () => {
  const totalprice = document.querySelector('.total-price');
  const evryCart = document.querySelectorAll('.cart__item');
  let result = 0;
  evryCart.forEach((item) => {
    const numero = Number(item.innerText.split('$')[1]);
    result += numero;
  });
  totalprice.innerHTML = `R$ ${result.toFixed(2)}`;
};

const cart = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  sumItems();
};

const limpaCart = () => {
  cart.innerHTML = '';
  localStorage.clear();
  const totalprice = document.querySelector('.total-price');
  totalprice.innerHTML = '';
};

const eventoLimpar = () => {
  const btnEmpty = document.querySelector('.empty-cart');
  btnEmpty.addEventListener('click', limpaCart);
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  sumItems();
  return li;
};

const addCart = async (event) => {
  const id = event.target.parentNode.firstChild.innerText;
  const obj = await fetchItem(id);
  const elements = createCartItemElement(obj);
  cart.appendChild(elements);
  saveCartItems(cart.innerHTML);
};

const items = document.querySelector('.items');

const printCarts = async () => {
  const products = await fetchProducts('computador');
  products.results.forEach((produto) => {
    const element = createProductItemElement(produto);
    items.appendChild(element);  
    element.addEventListener('click', addCart);
});
};

const loading = () => {
  const item = document.querySelector('.items');
  const span = document.createElement('span');
  span.innerText = 'carregando...';
  span.className = 'loading';
  item.appendChild(span);
};

const removeLoading = () => {
  const span = document.querySelector('.loading');
  span.remove();
};

window.onload = async () => {
  loading();
  await printCarts();
  const produtos = getSavedCartItems('cartItems');
  const getOl = document.querySelector('.cart__items');
  getOl.innerHTML = produtos;
  const retorna = document.querySelectorAll('.cart__item');
  retorna.forEach((element) => {
    element.addEventListener('click', createCartItemElement);
  });
  removeLoading();
  eventoLimpar();
  sumItems();
};
