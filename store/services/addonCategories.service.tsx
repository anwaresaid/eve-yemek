import axios from '../../helpers/_axios';

export default class AddonCategoriesService {
  public async getAddonCategories() {
    const { data } = await axios.get(
      'https://dev.eve-yemek.com/add-on-category'
    );
    return data;
  }

  public async getAddonCategoryDetails(id: string) {
    const { data } = await axios.get(
      `https://dev.eve-yemek.com/add-on-category/${id}`
    );
    return data;
  }

  public async updateAddonCategory(id: string, updateAddonCategoryDTO: any) {
    const { data } = await axios.put(
      `https://dev.eve-yemek.com/add-on-category/${id}`,
      updateAddonCategoryDTO
    );
    return data;
  }

  public async createAddonCategory(createAddonCategoryDTO: any) {
    const { data } = await axios.post(
      `https://dev.eve-yemek.com/add-on-category`,
      createAddonCategoryDTO
    );
    return data;
  }
}
