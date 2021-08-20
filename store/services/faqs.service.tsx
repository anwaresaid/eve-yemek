import axios from "../../helpers/_axios";

export default class FAQsService {

    async getFAQs(language = null) {
        const { data: { data } } = await axios.get('/faqs' + (language ? ('?language='+language) : ''))
        return data;
    }
}
