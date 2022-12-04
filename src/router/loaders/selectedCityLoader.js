import {getCityById, getCityByName} from "../../data/data";

export async function selectedCityLoader ({params}) {

     let city = getCityByName(params.id);
     if (city == null) {
         city = getCityById(params.id);
     }
     if (city) {
         city = { id: city.id, name: city.name };
     }
     return city;
}