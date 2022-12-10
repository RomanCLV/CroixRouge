import {getCityById, getCityByName} from "../../data/data";

export async function selectedCityLoader ({params}) {

     let city = getCityByName(params.id);
     if (city == null) {
         city = getCityById(params.id);
     }
     return city;
}