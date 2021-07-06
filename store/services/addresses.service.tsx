import axios from "../../helpers/_axios";

export default class AddressesService {

    async getSupportedCountries(){
        const {data:{data}} = await axios.get('/address/supported_countries');
        return data
    }

}