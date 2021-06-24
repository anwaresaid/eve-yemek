import axios from '../../helpers/_axios';

export default class AddonCategoryService {
  public async getAddonCategory() {
    const { data:{data} } = await axios.get(
      '/add-on-category'
    );
    return data;
  }

  public async getAddonCategoryDetails(id: string) {
    const { data:{data} } = await axios.get(
      `/add-on-category/${id}`
    );
    return data;
  }

  public async updateAddonCategory(id: string, updateAddonCategoryDTO: any) {
    const { data:{data} } = await axios.put(
      `/add-on-category/${id}`,
      updateAddonCategoryDTO
    );
    return data;
  }

  public async createAddonCategory(createAddonCategoryDTO: any) {
    const { data:{data} } = await axios.post(
      `/add-on-category`,
      createAddonCategoryDTO
    );
    return data;
  }
}
