function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    let trimmed = c.trim();
    if (trimmed.startsWith(name + "=")) {
      return trimmed.substring(name.length + 1);
    }
  }
  return "";
}

window.onload = function () {
  if (getCookie("assignmentBannerClosed") !== "true") {
    document.querySelector(".assignment-banner").classList.add("show");
  }
  document
    .querySelector(".close-banner")
    .addEventListener("click", function () {
      setCookie("assignmentBannerClosed", "true", 365);
      document.querySelector(".assignment-banner").classList.remove("show");
    });
};

async function fetchSatirischNieuws() {
  const apiUrl = "https://api.webz.io/newsApiLite";
  const apiToken = "56e797ec-eeb5-4824-8c02-0683c6af3f52";
  const query = "Satire";

  const response = await fetch(`${apiUrl}?token=${apiToken}&q=${query}`);
  const data = await response.json();
  const newsContainer = document.querySelector(".news-grid");
  newsContainer.innerHTML = "";

  data.posts.forEach((article) => {
    const newsItem = document.createElement("a");
    newsItem.classList.add("news-item");
    newsItem.href = article.thread.url || "#";
    newsItem.target = "_blank";

    const imageUrl =
      article.thread?.main_image?.trim() ||
      "images/file-not-found-c17b083c9c.jpg";
    newsItem.innerHTML = `
                <img src="${imageUrl}" alt="${article.title}">
                <h3>${article.title || "Geen titel beschikbaar"}</h3>
                <p>${article.text || "Geen beschrijving beschikbaar."}</p>
            `;
    newsContainer.appendChild(newsItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchSatirischNieuws();
});

const trendingLinks = document.querySelectorAll(".trending-list a");

trendingLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    const query = link.getAttribute("data-query");
    const response = await fetch(
      `https://api.webz.io/newsApiLite?token=56e797ec-eeb5-4824-8c02-0683c6af3f52&q=${query}`
    );
    const data = await response.json();
    const newsContainer = document.querySelector(".news-grid");
    newsContainer.innerHTML = "";

    data.posts.forEach((article) => {
      const newsItem = document.createElement("a");
      newsItem.classList.add("news-item");
      newsItem.href = article.thread.url || "#";
      newsItem.target = "_blank";

      const imageUrl =
        article.thread?.main_image?.trim() || "images/placeholder.jpg";
      newsItem.innerHTML = `
                    <img src="${imageUrl}" alt="${article.title}">
                    <h3>${article.title || "Geen titel beschikbaar"}</h3>
                    <p>${article.text || "Geen beschrijving beschikbaar."}</p>
                `;
      newsContainer.appendChild(newsItem);
    });
  });
});
