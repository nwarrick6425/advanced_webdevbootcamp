async function getMostFollowers(...usernames) {
  let baseUrl = 'https://api.github.com/users/';
  let urls = usernames.map(username => $.getJSON(baseUrl + username));
  let userList = await Promise.all(urls);
  let max = userList.sort((a,b) => a.followers < b.followers)[0];
  return `${max.name} has the most followers with ${max.followers}`;
}

async function starWarsString(id) {
  var str = '';
  let results = await $.getJSON(`https://swapi.co/api/people/${id}`)
  str += `${results.name} is featured in `;
  let movies = results.films[0];
  let moreResults = await $.getJSON(movies);
  str += `${moreResults.title}, directed by ${moreResults.director} `;
  let planetData = moreResults.planets[0];
  let finalResults = await $.getJSON(planetData);
  str += `and it takes place on ${finalResults.name}`;
  return str;
}