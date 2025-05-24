async function loadCovidData() {
  const url = "https://disease.sh/v3/covid-19/all";
  const res = await fetch(url);
  const data = await res.json();
  const formatter = new Intl.NumberFormat('en-US');

  // Update summary cards
  document.getElementById("cases-count").textContent = formatter.format(data.cases);
  document.getElementById("recovered-count").textContent = formatter.format(data.recovered);
  document.getElementById("deaths-count").textContent = formatter.format(data.deaths);

  // Render donut chart
  renderCovidDonutChart(data);

  // Format and display last updated timestamp
  const updatedDate = new Date(data.updated);
  const formattedDate = updatedDate.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  document.getElementById("last-updated").textContent = `Last updated: ${formattedDate}`;
}

function renderCovidDonutChart(data) {
  const ctx = document.getElementById('covidDonutChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Cases', 'Recovered', 'Deaths'],
      datasets: [{
        data: [data.cases, data.recovered, data.deaths],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',   // Blue
          'rgba(22, 163, 74, 0.7)',   // Green
          'rgba(220, 38, 38, 0.7)'    // Red
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(22, 163, 74, 1)',
          'rgba(220, 38, 38, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#1f2937'
          }
        }
      }
    }
  });
}

window.onload = loadCovidData;
