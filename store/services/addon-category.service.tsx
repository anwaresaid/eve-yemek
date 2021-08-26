import axios from '../../helpers/_axios';

export default class AddOnCategoryService {
  public async getAllAddonCategories(...args) {
    let query = '/add-on-category?'
        Object.keys(args[0]).forEach(key => query += args[0][key] ? (key + '=' + args[0][key] + '&') : '')
        const { data: { data } } = await axios.get(query)
        return data;
  }

  public async getAddonCategoryDetails(id: string) {
    const { data: { data } } = await axios.get(
      `/add-on-category/${id}`
    );
    return data;
  }

  public async updateAddonCategory(id: string, updateAddonCategoryDTO: any) {
    const { data: { data } } = await axios.put(
      `/add-on-category/${id}`,
      updateAddonCategoryDTO
    );
    return data;
  }

  public async createAddonCategory(createAddonCategoryDTO: any) {
    const { data: { data } } = await axios.post(
      `/add-on-category`,
      createAddonCategoryDTO
    );
    return data;
  }
}
