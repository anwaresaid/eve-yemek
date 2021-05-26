import axios from '../../helpers/_axios';

export default class AddonCategoriesService {
  async getAddonCategories() {
    const { data } = await axios.get(
      'https://dev.eve-yemek.com/add-on-category'
    );
    return data;
  }
}
