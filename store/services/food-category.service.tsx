import axios from '../../helpers/_axios';

export default class FoodCategorynService {
  public async getFoodCategory() {
    const { data } = await axios.get(
      'https://dev.eve-yemek.com/food-categories'
    );

    return data;
  }

  public async getFoodCategoryDetails(id: string) {
    const { data } = await axios.get(
      `https://dev.eve-yemek.com/food-categories/${id}`
    );

    return data;
  }

  public async createFoodCategory(createFoodCategoryDTO: any) {
    const { data } = await axios.post(
      'https://dev.eve-yemek.com/food-categories',
      createFoodCategoryDTO
    );

    return data;
  }

  public async updateFoodCategory(id: string, updateFoodCategoryDTO: any) {
    const { data } = await axios.put(
      `https://dev.eve-yemek.com/food-categories/${id}`,
      updateFoodCategoryDTO
    );

    return data;
  }
}
