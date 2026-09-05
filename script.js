const images = [
  { src: "images/mountain.svg", title: "Mountain Morning", category: "nature" },
  { src: "images/forest.svg", title: "Forest Escape", category: "nature" },
  { src: "images/city.svg", title: "City Lights", category: "city" },
  { src: "images/beach.svg", title: "Beach Journey", category: "travel" },
  { src: "images/desert.svg", title: "Desert Road", category: "travel" },
  { src: "images/architecture.svg", title: "Modern Architecture", category: "city" }
];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const progress = document.getElementById("progress");
const resultCount = document.getElementById("resultCount");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const item = images[currentIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxCategory.textContent = item.category;
  progress.textContent = `${currentIndex + 1} / ${images.length}`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function showPrevious() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

document.querySelectorAll(".image-card").forEach(card => {
  card.addEventListener("click", () => {
    openLightbox(Number(card.dataset.index));
  });
});

document.getElementById("closeBtn").addEventListener("click", closeLightbox);
document.getElementById("nextBtn").addEventListener("click", showNext);
document.getElementById("prevBtn").addEventListener("click", showPrevious);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrevious();
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;
    let visible = 0;

    document.querySelectorAll(".gallery-item").forEach(item => {
      const matches = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !matches);
      if (matches) visible++;
    });

    resultCount.textContent =
      filter === "all"
        ? `Showing all ${visible} images`
        : `Showing ${visible} ${filter} image${visible !== 1 ? "s" : ""}`;
  });
});
