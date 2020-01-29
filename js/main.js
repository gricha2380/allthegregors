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
  processGregor();
}

// pass latest_year_first value to show current year on page load
const loadMenu = (latest_year_first) => {
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

// run when raw data is grabbed from API
const processGregor = () => {
  raw_api.forEach(element => {
    all_gregors[element.year.S] = {
      "year": element.year.S,
      "description": element.description.S,
      "title": element.title.S,
    };
  });
  console.log('all gregor year after loop', all_gregors)
  do_random()

}

const loadGregor = (value) => {
  // check select menu value for year
  console.log('loading a new year')
  let year;

  if (value) {
    console.log('custom year value provided')
    year = value;
    document.querySelector(`#year [value="${value}"]`).selected = true;

  } else {
    year = document.querySelector('#year').value;
  }
  console.log('year is', year)
  

  const process_year = (value) => {
    console.log('all gregor current year value', all_gregors[year])
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
  
  const process_all_years = () => {
    let content = ``;
    for (const element in all_gregors) {
      console.log('this is element in all loop', element.title)

      content += `
      <div class="its_gregor" data-year="${all_gregors[element].year}">
        <div class="info">
          <div class="year">${all_gregors[element].year}</div>
          <div class="title">${all_gregors[element].title}</div>
          <div class="description">
              ${all_gregors[element].description} 
          </div>
        </div>
        <div class="avatar" id="year_${all_gregors[element].year}"></div>
      </div>
      `
    }
    document.querySelector('#lower').innerHTML = content;
  }

  if (year === 'All') {
    // process_year(all_gregors[year])
    console.log('you selected all years')
    process_all_years()
  } else {
    process_year(year)
  }


}

const do_random = () => {
  console.log('this is all gregors', all_gregors)
  let keys = Object.keys(all_gregors)
  let random = all_gregors[keys[ keys.length * Math.random() << 0]];
  console.log('this is the random', random.year)
  loadGregor(random.year);
}

document.querySelector('#year').addEventListener('change', (event)=>{
  console.log('you clicked the select menu')
  loadGregor();
})

document.querySelector('#random').addEventListener('click', (event)=>{
  console.log('you clicked random');
  do_random();
})

document.querySelector('#selfie').addEventListener('click', (event)=>{
  let team = document.querySelector('#team_holder');
  team.style.display = team.style.display == "block" ? "none" : "block";
})

document.querySelector('#team_holder').addEventListener('click', (event)=>{
  event.target.display = "none";
  console.log('you clicked on team')
})

