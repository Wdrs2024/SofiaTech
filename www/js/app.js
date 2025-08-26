// SofiaTech - Funções globais e inicialização do app
(function () {
  // Chaves usadas no localStorage
  const STORAGE_KEYS = { CART: 'st_cart', FAV: 'st_fav' };

  // Funções auxiliares
  function load(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
      return [];
    }
  }

  function save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
    }
  }

  // Criando objeto global ST
  window.ST = {
    addToCart(item) {
      const cart = load(STORAGE_KEYS.CART);
      cart.push(item);
      save(STORAGE_KEYS.CART, cart);
      alert('Adicionado ao carrinho!');
      ST.updateCartBadge();
    },
    getCart() {
      return load(STORAGE_KEYS.CART);
    },
    removeFromCart(idx) {
      const cart = load(STORAGE_KEYS.CART);
      cart.splice(idx, 1);
      save(STORAGE_KEYS.CART, cart);
      ST.updateCartBadge();
      location.reload();
    },
    addFav(item) {
      const fav = load(STORAGE_KEYS.FAV);
      fav.push(item);
      save(STORAGE_KEYS.FAV, fav);
      alert('Adicionado aos favoritos!');
    },
    getFav() {
      return load(STORAGE_KEYS.FAV);
    },
    clear() {
      localStorage.clear();
      ST.updateCartBadge();
    },
    updateCartBadge() {
      // Atualiza o contador do carrinho
      const badge = document.getElementById('quantidade-carrinho');
      if (badge) {
        const count = ST.getCart().length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
      }
    }
  };

  // Inicializando Framework7
  window.app = new Framework7({
    root: '#app',
    name: 'SofiaTech',
    id: 'com.sofiatech.app',
    routes: [], // Rotas podem ser adicionadas depois
  });

  // Atualizar badge do carrinho ao carregar
  document.addEventListener('DOMContentLoaded', ST.updateCartBadge);
})();
