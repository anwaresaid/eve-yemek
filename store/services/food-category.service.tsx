import axios from '../../helpers/_axios';

export default class FoodCategorynService {
  public async getFoodCategory() {
    const { data:{data} } = await axios.get(
      '/food-categories'
    );

    return data;
  }

  public async getFoodCategoryDetails(id: string) {
    const { data:{data} } = await axios.get(
      `/food-categories/${id}`
    );

    return data;
  }

  public async createFoodCategory(createFoodCategoryDTO: any) {
    const { data:{data} } = await axios.post(
      '/food-categories',
      createFoodCategoryDTO
    );

    return data;
  }

  public async updateFoodCategory(id: string, updateFoodCategoryDTO: any) {
    const { data:{data} } = await axios.put(
      `/food-categories/${id}`,
      updateFoodCategoryDTO
    );

    return data;
  }
}
