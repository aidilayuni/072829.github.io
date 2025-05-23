async function fetchRedditSocialMedia() {
  const output = document.getElementById("reddit-output");
  const chartCanvas = document.getElementById("redditChart").getContext("2d");

  try {
    const url = "https://api.rss2json.com/v1/api.json?rss_url=https://www.reddit.com/r/socialmedia/.rss";
    const response = await fetch(url);
    const data = await response.json();

    const items = data.items.slice(0, 6); // Take top 6 items
    output.innerHTML = "";

    // Display each Reddit post
    items.forEach(post => {
      const card = document.createElement("div");
      card.className = "bg-white border p-4 rounded shadow";
      card.innerHTML = `
        <h3 class="font-bold text-lg">${post.title}</h3>
        <p class="text-sm text-gray-600">${new Date(post.pubDate).toLocaleString()}</p>
        <a href="${post.link}" class="text-blue-600 underline text-sm" target="_blank" rel="noopener">View on Reddit</a>
      `;
      output.appendChild(card);
    });

    // Generate a simple chart showing post length
    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: items.map((post, i) => `Post ${i + 1}`),
        datasets: [{
          label: "Title Length",
          data: items.map(post => post.title.length),
          backgroundColor: "#E9967A"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } catch (err) {
    output.innerHTML = `<p class="text-red-500">Failed to load data: ${err.message}</p>`;
  }
}

window.onload = fetchRedditSocialMedia;
