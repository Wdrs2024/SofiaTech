// Inicialização do Framework7 (fora do deviceready, pois app não depende do dispositivo)
var app = new Framework7({
  el: '#app',
  name: 'My App',
  id: 'com.myapp.test',
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      animate: false,
      on: {
        pageBeforeIn: function () {
          $("#menuPrincipal").show("fast");
        },
        pageInit: function () {
          // Carrega script da página apenas uma vez
          if (!window.indexScriptLoaded) {
            $.getScript('js/index.js', function () {
              window.indexScriptLoaded = true;
            });
          }

          // Swiper principal
          if (!document.querySelector('.mySwiper')?.classList.contains('swiper-initialized')) {
            new Swiper(".mySwiper", {
              slidesPerView: 1,
              spaceBetween: 30,
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
              },
              loop: true,
              breakpoints: {
                50: { slidesPerView: 1, spaceBetween: 30 },
                640: { slidesPerView: 2, spaceBetween: 30 },
                992: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              },
            });
          }

          // Swiper categorias
          if (!document.querySelector('.categorias')?.classList.contains('swiper-initialized')) {
            new Swiper(".categorias", {
              slidesPerView: 3,
              spaceBetween: 10,
              freeMode: true,
              breakpoints: {
                50: { slidesPerView: 3, spaceBetween: 10 },
                640: { slidesPerView: 6, spaceBetween: 10 },
                992: { slidesPerView: 8, spaceBetween: 10 },
                1200: { slidesPerView: 12, spaceBetween: 10 },
              },
            });
          }

          // Swiper produtos (condicional)
          const produtosEl = document.querySelector('.mySwiperProdutos');
          if (produtosEl && !produtosEl.classList.contains('swiper-initialized')) {
            new Swiper(".mySwiperProdutos", {
              slidesPerView: 2,
              spaceBetween: 12,
              freeMode: true,
              breakpoints: {
                320: { slidesPerView: 1.2 },
                480: { slidesPerView: 1.5 },
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              },
            });
          }
        },
      },
    },
    {
      path: '/link2/',
      url: 'link2.html',
      animate: false,
    },
    {
      path: '/link3/',
      url: 'link3.html',
      animate: false,
    },
    {
      path: '/link4/',
      url: 'link4.html',
      animate: false,
    },
    {
      path: '/details/',
      url: 'details.html',
      animate: false,
      on: {
        pageBeforeIn: function () {
          $("#menuPrincipal").hide("fast");
        },
        pageInit: function () {
          if (!window.detailsScriptLoaded) {
            $.getScript('js/details.js', function () {
              window.detailsScriptLoaded = true;
            });
          }
        },
      },
    },
    {
      path: '/carrinho/',
      url: 'carrinho.html',
      options: {
        transition: 'f7-push',
      },
      on: {
        pageBeforeIn: function () {
          $("#menuPrincipal").hide("fast");
        },
        
        
        pageInit: function (event, page) {
         console.log('Entrou em Carrinho via pageInit', page);
         if (!window.carrinhoScriptLoaded) {
         $.getScript('js/carrinho.js', function () {
         window.carrinhoScriptLoaded = true;
       });
  }
}


       
      },
    },
  ],
});

// Cria a view principal
var mainView = app.views.create('.view-main', { url: '/index/' });

// Atualiza abas ativas ao trocar de rota
app.on('routeChange', function (route) {
  const currentRoute = route.url;
  document.querySelectorAll('.tab-link').forEach(el => el.classList.remove('active'));
  const activeEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (activeEl) {
    activeEl.classList.add('active');
  }
});

// Cordova: Função quando o dispositivo está pronto
function onDeviceReady() {
  document.addEventListener("backbutton", function (e) {
    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);
}

// Listener para o evento 'deviceready'
document.addEventListener('deviceready', onDeviceReady, false);
