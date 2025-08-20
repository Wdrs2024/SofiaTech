// Inicialização do Framework7 (fora do deviceready, pois app não depende do dispositivo)
var app = new Framework7({
  // App root element
  el: '#app',
  // Nome do app
  name: 'My App',
  // ID do app
  id: 'com.myapp.test',
  // Painel lateral com swipe habilitado
  panel: {
    swipe: true,
  },
  // Textos padrão do diálogo
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  // Rotas
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // Mostra menu principal na home
          $("#menuPrincipal").show("fast");
        },
        pageInit: function (event, page) {
          // Carrega script da página
          $.getScript('js/index.js');

          // Inicializa Swiper principal com autoplay configurado corretamente
          var swiper = new Swiper(".mySwiper", {
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

          var swiper2 = new Swiper(".categorias", {
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

          // Se houver swiper de produtos nesta página, inicialize aqui também (exemplo)
          if(document.querySelector('.mySwiperProdutos')){
            var swiperProdutos = new Swiper(".mySwiperProdutos", {
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
        pageBeforeIn: function (event, page) {
          // Esconde menu principal na página de detalhes
          $("#menuPrincipal").hide("fast");
        },
        pageInit: function (event, page) {
          $.getScript('js/details.js');
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
        pageBeforeIn: function (event, page) {
          $("#menuPrincipal").hide("fast");
        },
      },
    },
  ],
});

// Cria a view principal e define URL inicial
var mainView = app.views.create('.view-main', { url: '/index/' });

// Atualiza o estado ativo do menu de abas quando a rota muda
app.on('routeChange', function (route) {
  var currentRoute = route.url;
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});

// Função chamada quando o dispositivo está pronto (Cordova/PhoneGap)
function onDeviceReady() {
  // Captura botão voltar do Android
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

// Adiciona listener para o deviceready
document.addEventListener('deviceready', onDeviceReady, false);
