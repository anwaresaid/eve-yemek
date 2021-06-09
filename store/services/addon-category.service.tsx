import { baseUrl } from '../../helpers/constants';
import axios from '../../helpers/_axios';

export default class AddonCategoryService {
  public async getAddonCategory() {
    const { data } = await axios.get(
      baseUrl + '/add-on-category'
    );
    return data;
  }

  public async getAddonCategoryDetails(id: string) {
    const { data } = await axios.get(
      baseUrl + `/add-on-category/${id}`
    );
    return data;
  }

  public async updateAddonCategory(id: string, updateAddonCategoryDTO: any) {
    const { data } = await axios.put(
      baseUrl + `/add-on-category/${id}`,
      updateAddonCategoryDTO
    );
    return data;
  }

  public async createAddonCategory(createAddonCategoryDTO: any) {
    const { data } = await axios.post(
      baseUrl + `/add-on-category`,
      createAddonCategoryDTO
    );
    return data;
  }
}
