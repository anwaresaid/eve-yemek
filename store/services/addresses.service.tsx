import axios from "../../helpers/_axios";

export default class AddressesService {

    async addAddress(addressData) {
        const { data: { data } } = await axios.post('/address', addressData);
        return data
    }

    async getSupportedCountries() {
        const { data: { data } } = await axios.get('/address/supported_countries');
        return data
    }

    async getAddressDetails(addressID) {
        const { data: { data } } = await axios.get('/address/' + addressID);
        return data
    }
}