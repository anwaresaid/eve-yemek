import axios from '../../helpers/_axios';

export default class FoodCategoryService {
  public async getAllFoodCategories(...args) {
    let query = '/food-categories?'
    Object.keys(args[0]).forEach(key => query += args[0][key] ? (key + '=' + args[0][key] + '&') : '')
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
