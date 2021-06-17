import axios from "../../helpers/_axios";

export default class UploadService {

    public async uploadFile(file){
        var formData = new FormData();
        formData.append("file", file);
        const {data:{data}} = await axios.post('/upload', formData);
        return data;
    }
}