const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex); // || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place) => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const addressLine1 = place.address_line_1;
    const {category} = place;
    const restaurantName = place.name;
    return `
      <li>
      <div class = "suggestions li">
        <span class="name">${restaurantName}</span>
        <br>
        <span class="category">${category}</span>
        <br>
        <span class="address">${addressLine1}</span>
        <br>
        <span class="city">${cityName}</span>
      </div>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);