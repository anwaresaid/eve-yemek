import axios from "../../helpers/_axios";

export default class AddOnsService {

    async getAllAddOns(offset, limit, fields = null, text = null) {
        var query
        if (!fields || fields == '' || !text || text == '') {
            query = '/add-ons?offset=' + offset + '&limit=' + limit
        } else {
            query = '/add-ons?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
        }
        const { data: { data } } = await axios.get(query)
        return data;
    }

    async createAddons(addons) {
        const { data: { data } } = await axios.post('/add-ons', { ...addons });
        return data
    }
    async findAddons(id) {
        const { data: { data } } = await axios.get(`/add-ons/${id}`);
        return data
    }
    async updateAddons(id, addons) {
        const { data: { data } } = await axios.put(`/add-ons/${id}`, { ...addons });
        return data
    }
}