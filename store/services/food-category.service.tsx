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
}
