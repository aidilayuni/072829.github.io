async function loadCovidData() {
  const url = "https://disease.sh/v3/covid-19/all";
  const res = await fetch(url);
  const data = await res.json();

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
}

window.onload = loadCovidData;
