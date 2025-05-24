async function loadCovidData() {
  const url = "https://disease.sh/v3/covid-19/all";
  const historicalUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";

  const [currentRes, historicalRes] = await Promise.all([
    fetch(url),
    fetch(historicalUrl)
  ]);
  const data = await currentRes.json();
  const historicalData = await historicalRes.json();

  const formatter = new Intl.NumberFormat('en-US');

  document.getElementById("covid-output").innerHTML = `
    <div class="bg-blue-700 p-6 rounded-xl shadow-lg text-center">
      <h2 class="text-xl font-semibold mb-2">Total Cases</h2>
      <p class="text-3xl font-bold">${formatter.format(data.cases)}</p>
    </div>
    <div class="bg-green-700 p-6 rounded-xl shadow-lg text-center">
      <h2 class="text-xl font-semibold mb-2">Recovered</h2>
      <p class="text-3xl font-bold">${formatter.format(data.recovered)}</p>
    </div>
    <div class="bg-red-700 p-6 rounded-xl shadow-lg text-center">
      <h2 class="text-xl font-semibold mb-2">Deaths</h2>
      <p class="text-3xl font-bold">${formatter.format(data.deaths)}</p>
    </div>
  `;

  renderCovidChart(historicalData);
}

function renderCovidChart(historical) {
  const dates = Object.keys(historical.cases);
  const cases = Object.values(historical.cases);
  const deaths = Object.values(historical.deaths);

  const ctx = document.getElementById('covidChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'New Cases',
          data: cases,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'Deaths',
          data: deaths,
          borderColor: 'rgba(220, 38, 38, 1)',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#fff'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#ccc' }
        },
        y: {
          ticks: { color: '#ccc' }
        }
      }
    }
  });
}

window.onload = loadCovidData;
