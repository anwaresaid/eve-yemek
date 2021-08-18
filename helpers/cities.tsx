import jsonCly from '../public/data/ly_city.json';
import jsonDly from '../public/data/ly_district.json';
import jsonCtr from '../public/data/tr_city.json';
import jsonDtr from '../public/data/tr_district.json';


export function getLibyanCities(){
    return jsonCly
} 
export function getTurkishCities(){
    return jsonCtr
} 
export function getLibyanDistricts(){
    return jsonDly
} 
export function getTurkishDistricts(){
    return jsonDtr
} 
