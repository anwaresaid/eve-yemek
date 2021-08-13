import axios from '../../helpers/_axios';

export default class AddOnCategoryService {
  public async getAllAddonCategories(offset, limit, fields = null, text = null) {
    var query
    if (!fields || fields == '' || !text || text == '') {
      query = '/add-on-category?offset=' + offset + '&limit=' + limit
    } else {
      query = '/add-on-category?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
    }
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
