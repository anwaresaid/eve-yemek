import axios from '../../helpers/_axios';

export default class FoodCategoryService {
  public async getAllFoodCategories(offset, limit, fields = null, text = null) {
    var query
    if (!fields || fields == '' || !text || text == '') {
      query = '/food-categories?offset=' + offset + '&limit=' + limit
    } else {
      query = '/food-categories?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
    }
    const { data: { data } } = await axios.get(query)
    return data;
  }

  public async getFoodCategoryDetails(id: string) {
    const { data: { data } } = await axios.get(
      `/food-categories/${id}`
    );

    return data;
  }

  public async createFoodCategory(createFoodCategoryDTO: any) {
    const { data: { data } } = await axios.post(
      '/food-categories',
      createFoodCategoryDTO
    );

    return data;
  }

  public async updateFoodCategory(id: string, updateFoodCategoryDTO: any) {
    const { data: { data } } = await axios.put(
      `/food-categories/${id}`,
      updateFoodCategoryDTO
    );

    return data;
  }
}
