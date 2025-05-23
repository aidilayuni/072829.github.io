async function loadCovidData() {
  const url = "https://disease.sh/v3/covid-19/all";
  const res = await fetch(url);
  const data = await res.json();

  document.getElementById("covid-output").innerHTML = `
    <p>Total Cases: ${data.cases}</p>
    <p>Recovered: ${data.recovered}</p>
    <p>Deaths: ${data.deaths}</p>
  `;
}

window.onload = loadCovidData;
