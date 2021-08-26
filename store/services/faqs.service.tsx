import axios from "../../helpers/_axios";

export default class FAQsService {

    async getFAQs(language = null) {
        const { data: { data } } = await axios.get('/faqs' + (language ? ('?language=' + language) : ''))
        return data;
    }

    async updateFAQbyID(id, updateData) {
        const { data: { data } } = await axios.put('/faqs/' + id, { ...updateData })
        return data;
    }

    async addFAQ(faq) {
        const { data: { data } } = await axios.post('/faqs', { ...faq })
        return data;
    }

}
