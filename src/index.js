let planets = [];
let people = [];
const planetElements = document.getElementById("planets");
const peopleElement = document.getElementById("people");

getPlanest().then(data => {
    console.log("Jupí, máme data");
    planets = data;
    showPlanets();

    getPeople(planets[0].people);
})

//.catch(error => console.log("došlo k chybě"));

async function getPeople(persons) {
    let personPromises = persons.map(person => {
        return getPerson(person);
    }) 

    Promise.all(personPromises)
        .then(responses => {
            people = responses;
            showPeople();
        });
}

function showPeople() {
 
    let html = "";
      people.forEach(person => {
          html = html + `
          <div class="person">
          <div class="person__icon"><i class="fas fa-robot"></i></div>
          <h2 class="person__name">${person.name}</h2>
          <p class="person__info">
            Hair: ${person.hair}<br>
            Eyes: ${person.eyes}<br>
            Height: ${person.height} cm
          </p>
        </div>
          `
      })
  
      //reduce - je ekvivalentem forEach, co je nám příjemnější, to použít
  
     /* let html = planets.reduce((total,planet) => {
          return total + `
          <div class="planet">
              <div class="planet__name">${planet.name}</div>
              <div class="planet_count">${planet.people.length}<i class="fas fa-child"></i></div>
          </div>
          `;
      }, ""); */
  
      peopleElement.innerHTML = html;
      }

async function getPlanest() {
    let response = await fetch("https://swapi.co/api/planets/");
        // .then(response => response.json())
        // .then(data => console.log(data));
    let data = await response.json();

    return data.results.map(planet => {
        return {
            name: planet.name,
            dayLenght: planet.rotation_period,
            yearLenght: planet.orbital_period,
            people: planet.residents
        }
    });
}


async function getPerson (url) {
    let response = await fetch(url);
    let data = await response.json();

    return {
        name: data.name,
        gender: data.gender,
        height: data.height,
        hair: data.hair_color,
        eyes: data.eye_color
    }
}


function showPlanets() {
 
  /*  let html = "";
    planets.forEach(planet => {
        html = html + `
        <div class="planet">
            <div class="planet__name">${planet.name}</div>
            <div class="planet_count">${planet.people.length}<i class="fas fa-child"></i></div>
        </div>
        `
    }) */

    //reduce - je ekvivalentem forEach, co je nám příjemnější, to použít

    let html = planets.reduce((total,planet) => {
        return total + `
        <div class="planet">
            <div class="planet__name">${planet.name}</div>
            <div class="planet_count">${planet.people.length}<i class="fas fa-child"></i></div>
        </div>
        `;
    }, "");

    planetElements.innerHTML = html;
    }