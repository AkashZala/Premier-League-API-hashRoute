const list = document.querySelector('.list');
const head = document.getElementById('headLogo');
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
            <a class='${team.idTeam === hash ? "selected" : ''}' href='#${team.idTeam === hash ? "" : team.idTeam}'>
            <img class='teamBadge' src='${team.strTeamBadge}'/> <p>${team.strTeam}</p>
            </a>
        `
        
    }).join('');
    

    list.innerHTML = toHtml;
    
    state.team = state.teamsList.find(team => team.idTeam === hash);
    
    if (state.team) {
        details.innerHTML = `
            <p>${state.team.strTeam}</p>
        `
    } else {
        details.innerHTML ='';
    }
    
}
    


function renderSelected() {
    details.innerHTML = `
        <p>${state.team.strTeam}</p>
    `
}


getData();
