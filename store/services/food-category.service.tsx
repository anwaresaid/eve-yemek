import { baseUrl } from '../../helpers/constants';
import axios from '../../helpers/_axios';

export default class FoodCategorynService {
  public async getFoodCategory() {
    const { data } = await axios.get(
      baseUrl + '/food-categories'
    );

    return data;
  }

  public async getFoodCategoryDetails(id: string) {
    const { data } = await axios.get(
      baseUrl + `/food-categories/${id}`
    );

    return data;
  }

  public async createFoodCategory(createFoodCategoryDTO: any) {
    const { data } = await axios.post(
      baseUrl + '/food-categories',
      createFoodCategoryDTO
    );

    return data;
  }

  public async updateFoodCategory(id: string, updateFoodCategoryDTO: any) {
    const { data } = await axios.put(
      baseUrl + `/food-categories/${id}`,
      updateFoodCategoryDTO
    );

    return data;
  }
}
