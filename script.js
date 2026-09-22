// ======================================================
// MENU
// ======================================================

const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}


// ======================================================
// ANO NO RODAPÉ
// ======================================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// ======================================================
// CONFIGURAÇÃO DO CHATWOOT
// ======================================================

window.chatwootSettings = {
  position: "right",
  type: "standard",
  launcherTitle: ""
};


// ======================================================
// CAPTURA DAS UTMs
// ======================================================

const params = new URLSearchParams(window.location.search);

const utm_source = params.get("utm_source");
const utm_medium = params.get("utm_medium");
const utm_campaign = params.get("utm_campaign");


// Salva as UTMs no navegador

if (utm_source) {
  localStorage.setItem("utm_source", utm_source);
}

if (utm_medium) {
  localStorage.setItem("utm_medium", utm_medium);
}

if (utm_campaign) {
  localStorage.setItem("utm_campaign", utm_campaign);
}


// ======================================================
// CARREGA O SDK DO CHATWOOT
// ======================================================

(function (d, t) {

  var BASE_URL = "https://chatwoot.neomind.com.br";

  var g = d.createElement(t);
  var s = d.getElementsByTagName(t)[0];

  g.src = BASE_URL + "/packs/js/sdk.js";
  g.async = true;

  s.parentNode.insertBefore(g, s);

  g.onload = function () {

    window.chatwootSDK.run({
      websiteToken: "nwZanXoAanndCKio2Gwj5yXV",
      baseUrl: BASE_URL
    });

  };

})(document, "script");


// ======================================================
// QUANDO O CHATWOOT TERMINAR DE CARREGAR
// ======================================================

window.addEventListener("chatwoot:ready", function () {

  console.log("Chatwoot carregado com sucesso.");

  const atributos = {};

  const source = localStorage.getItem("utm_source");
  const medium = localStorage.getItem("utm_medium");
  const campaign = localStorage.getItem("utm_campaign");


  if (source) {
    atributos.utm_source = source;
  }

  if (medium) {
    atributos.utm_medium = medium;
  }

  if (campaign) {
    atributos.utm_campaign = campaign;
  }


  // Envia os atributos para o Chatwoot
  if (Object.keys(atributos).length > 0) {

    window.$chatwoot.setCustomAttributes(atributos);

    console.log(
      "Dados enviados ao Chatwoot:",
      atributos
    );

  } else {

    console.log("Nenhuma UTM encontrada.");

  }

});


// ======================================================
// FUNÇÃO PARA ABRIR O CHATWOOT PELOS BOTÕES
// ======================================================

function openChatwoot() {

  if (window.$chatwoot) {

    window.$chatwoot.toggle("open");

  } else {

    console.log("O Chatwoot ainda está carregando.");

  }

}


// ======================================================
// BOTÃO SUPERIOR
// ======================================================

const openChatButton =
  document.getElementById("openChatButton");

if (openChatButton) {

  openChatButton.addEventListener(
    "click",
    openChatwoot
  );

}


// ======================================================
// BOTÃO INFERIOR
// ======================================================

const openChatButtonBottom =
  document.getElementById("openChatButtonBottom");

if (openChatButtonBottom) {

  openChatButtonBottom.addEventListener(
    "click",
    openChatwoot
  );

}