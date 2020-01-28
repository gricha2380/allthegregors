// load gregor object
// populate year menu with dates
// start with random year loaded
// event listener for random year button

// Load from local JSON
// fetch('js/data.json')
// .then((resp) => resp.json())
// .then((data) => saveGregors(data))

fetch('https://7prnxckt9k.execute-api.us-east-1.amazonaws.com/Prod')
.then((resp) => resp.json())
.then((data) => saveGregors(data))

let all_gregors = {};
let raw_api = [];

const saveGregors = (data) => {
  console.log('this is data from API', data)
  raw_api = data;
  loadMenu();
  loadGregor();
}

const loadMenu = () => {
  let yearData = `<option value="All">All</option>`;
  let raw_api_sorted = raw_api.sort(function(a, b){return b.year.S - a.year.S});
  console.log('this is sorted', raw_api_sorted)
  raw_api_sorted.forEach((element, i) => {
    if (i === 0) {
      yearData += `<option value="${element.year.S}" selected>${element.year.S}</option>`;
    } else {
      yearData += `<option value="${element.year.S}">${element.year.S}</option>`;
    }
  })
  console.log('yeardata', yearData)
  document.querySelector('#year').innerHTML = yearData;
}

const loadGregor = () => {
  // check select menu value for year
  console.log('loading a new year')
  let year = document.querySelector('#year').value;
  console.log('year is', year)
  
  const processYear = (value) => {
    console.log('year value inner', year)

    raw_api.forEach(element => {
      all_gregors[element.year.S] = {
        "year": element.year.S,
        "description": element.description.S,
        "title": element.title.S,
      };
    });

    console.log('all gregor year after loop', all_gregors)
    console.log('all gregor year value', all_gregors[year])
    console.log('all gregors', all_gregors)
    let content = `
    <div class="its_gregor" data-year="${year}">
      <div class="info">
        <div class="year">${year}</div>
        <div class="title">${all_gregors[year].title}</div>
        <div class="description">
            ${all_gregors[year].description} 
        </div>
      </div>
      <div class="avatar" id="year_${year}"></div>
    </div>
    `
    document.querySelector('#lower').innerHTML = content;
  }

  if (year === 'All') {
    // processYear(all_gregors[year])
    console.log('you selected all years')
  } else {
    processYear(year)
  }


}

document.querySelector('#year').addEventListener('change', (event)=>{
  console.log('you clicked the select menu')
  loadGregor();
})