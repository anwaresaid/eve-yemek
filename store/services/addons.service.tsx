import axios from "../../helpers/_axios";

export default class AddOnsService {

    async getAllAddOns(...args) {
        let query = '/add-ons?'
        Object.keys(args[0]).forEach(key => query += args[0][key] ? (key + '=' + args[0][key] + '&') : '')
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