/* Probably dont need
const data = {}
data.states = require('../model/Bio.json');

function validBio (obj){  
    data.states.some((state) => {if (state.code.toLowerCase() === obj.code.toLowerCase()) {
    obj.name = state.state
    obj.population = state.population.toLocaleString()
    obj.nickname = state.nickname
    obj.capital = state.capital_city
    obj.admission = state.admission_date
    obj.valid =  true}});
    return obj;
}*/