const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".card")];
const filters = [...document.querySelectorAll(".filter")];
const empty = document.getElementById("empty");
let activeCategory = "All";

function updateArticles() {
  const query = search.value.toLowerCase().trim();
  let count = 0;

  cards.forEach(card => {
    const categoryMatch =
      activeCategory === "All" ||
      card.dataset.category === activeCategory;

    const searchMatch = card.innerText.toLowerCase().includes(query);
    const visible = categoryMatch && searchMatch;

    card.hidden = !visible;
    if (visible) count++;
  });

  empty.hidden = count > 0;
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    filters.forEach(item =>
      item.classList.toggle("active", item === button)
    );

    updateArticles();
  });
});

search.addEventListener("input", updateArticles);

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Article popup
const dialog = document.getElementById("articleDialog");

document.querySelectorAll(".read").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("dialogTitle").textContent =
      button.dataset.title;

    document.getElementById("dialogText").textContent =
      button.dataset.text;

    dialog.showModal();
  });
});

document.getElementById("closeDialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

// Automatic copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();
