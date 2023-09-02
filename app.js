const list = document.querySelector('.list');
const info = document.getElementById('info');
const details = document.getElementById('details');

state = {
    teamsList: [],
    team: null
};

window.addEventListener('hashchange', () => {
    renderTeams();
});

async function getData() {
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
    const json = await response.json();
    state.teamsList = json.teams;
    renderTeams();
}

function renderTeams() {
    const hash = window.location.hash.slice(1);
    const toHtml = state.teamsList.map((team) => {
        return `
            <a class='${team.idTeam === hash ? "selected" : ''}' 
            href='#${team.idTeam === hash ? "" : team.idTeam}' 
            style="background-color: ${team.idTeam === hash ? team.strKitColour1.replaceAll('"', "") : 'none'}">
            <img class='teamBadge' src='${team.strTeamBadge}'/> ${team.strTeam}
            </a>
        `
    }).join('');

    list.innerHTML = toHtml;
    info.innerHTML = `<p>Click A Team For More Information!</p>`

    state.team = state.teamsList.find(team => team.idTeam === hash);

    if (state.team) {
        details.innerHTML = `
        <div class="container" style="background-color: ${state.team.strKitColour1.replaceAll('"', "")}BF; border: 5px solid ${state.team.strKitColour2.replaceAll('"', "")}">
            <img id="banner" src=${state.team.strTeamBanner} />
            <div id="head">
                <h1>${state.team.strTeam}</h1>
                <h3>${state.team.strKeywords}</h3>
            </div>
            <div id='rowTwo'>
                <img id='logo' src=${state.team.strTeamBadge} />
                <div id='rowTwoText'>
                    <p>${state.team.strAlternate}</p>
                    <p>Founded: ${state.team.intFormedYear}</p>
                    <p>Stadium: ${state.team.strStadium} (${state.team.strStadiumLocation})</p>
                </div>
            </div>
            <img id='stadium' src=${state.team.strStadiumThumb} />
            <p>${state.team.strDescriptionEN}</p>
        </div>
        `
        info.innerHTML = '';
    } else {
        details.innerHTML = '';
    }
}

getData();
