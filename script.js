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
// CAPTURA PARÂMETROS DA URL
// ======================================================

const params = new URLSearchParams(window.location.search);

const utmSource = params.get("utm_source");
const utmMedium = params.get("utm_medium");
const utmCampaign = params.get("utm_campaign");

console.log("======================================");
console.log("PARÂMETROS RECEBIDOS NA URL");
console.log("utm_source:", utmSource);
console.log("utm_medium:", utmMedium);
console.log("utm_campaign:", utmCampaign);
console.log("======================================");


// ======================================================
// SALVA UTMs NO LOCALSTORAGE
// ======================================================

if (utmSource) {
  localStorage.setItem("utm_source", utmSource);
}

if (utmMedium) {
  localStorage.setItem("utm_medium", utmMedium);
}

if (utmCampaign) {
  localStorage.setItem("utm_campaign", utmCampaign);
}


// ======================================================
// MOSTRA O QUE FICOU SALVO
// ======================================================

console.log("UTMs armazenadas no localStorage:");

console.log(
  "utm_source:",
  localStorage.getItem("utm_source")
);

console.log(
  "utm_medium:",
  localStorage.getItem("utm_medium")
);

console.log(
  "utm_campaign:",
  localStorage.getItem("utm_campaign")
);


// ======================================================
// CARREGA SDK DO CHATWOOT
// ======================================================

(function (d, t) {

  const BASE_URL = "https://chatwoot.neomind.com.br";

  const g = d.createElement(t);
  const s = d.getElementsByTagName(t)[0];

  g.src = BASE_URL + "/packs/js/sdk.js";
  g.async = true;

  s.parentNode.insertBefore(g, s);

  g.onload = function () {

    console.log("SDK do Chatwoot carregado.");

    if (!window.chatwootSDK) {
      console.error(
        "Erro: window.chatwootSDK não está disponível."
      );

      return;
    }


    window.chatwootSDK.run({
      websiteToken: "nwZanXoAanndCKio2Gwj5yXV",
      baseUrl: BASE_URL
    });

  };


  g.onerror = function () {

    console.error(
      "Erro ao carregar o SDK do Chatwoot."
    );

  };

})(document, "script");


// ======================================================
// QUANDO CHATWOOT ESTIVER PRONTO
// ======================================================

window.addEventListener(
  "chatwoot:ready",
  function () {

    console.log("======================================");
    console.log("CHATWOOT READY");
    console.log("======================================");


    // ==================================================
    // VERIFICA SE O CHATWOOT ESTÁ DISPONÍVEL
    // ==================================================

    if (!window.$chatwoot) {

      console.error(
        "window.$chatwoot não está disponível."
      );

      return;

    }


    // ==================================================
    // RECUPERA UTMs DO LOCALSTORAGE
    // ==================================================

    const source =
      localStorage.getItem("utm_source");

    const medium =
      localStorage.getItem("utm_medium");

    const campaign =
      localStorage.getItem("utm_campaign");


    const atributos = {};


    if (source) {
      atributos.utm_source = source;
    }

    if (medium) {
      atributos.utm_medium = medium;
    }

    if (campaign) {
      atributos.utm_campaign = campaign;
    }


    console.log(
      "Atributos preparados para envio:",
      atributos
    );


    // ==================================================
    // ENVIA PARA O CHATWOOT
    // ==================================================

    if (Object.keys(atributos).length > 0) {

      console.log(
        "Enviando atributos personalizados:",
        atributos
      );


      try {

        window.$chatwoot.setCustomAttributes(
          atributos
        );


        console.log(
          "setCustomAttributes executado com sucesso:",
          atributos
        );

      } catch (erro) {

        console.error(
          "Erro ao executar setCustomAttributes:",
          erro
        );

      }

    } else {

      console.warn(
        "Nenhuma UTM disponível para enviar ao Chatwoot."
      );

    }

  }
);


// ======================================================
// FUNÇÃO PARA ABRIR CHATWOOT
// ======================================================

function openChatwoot() {

  if (window.$chatwoot) {

    console.log("Abrindo Chatwoot...");

    window.$chatwoot.toggle("open");

  } else {

    console.warn(
      "Chatwoot ainda não terminou de carregar."
    );

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