const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("open");
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

function openChatwoot() {
  if (window.$chatwoot) {
    window.$chatwoot.toggle("open");
    return;
  }

  console.log("O Chatwoot ainda está carregando.");
}

document
  .getElementById("openChatButton")
  .addEventListener("click", openChatwoot);

document
  .getElementById("openChatButtonBottom")
  .addEventListener("click", openChatwoot);

window.addEventListener("chatwoot:ready", function () {
  console.log("Chatwoot carregado com sucesso.");
});
