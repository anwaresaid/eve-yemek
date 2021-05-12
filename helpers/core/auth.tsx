import cookies from 'js-cookie';

export default {
    loggedIn:false,
    user:null,
    token:null,

    init(){
        if(cookies.get("user")){
            this.user = JSON.parse(cookies.get("user"));
            this.token = this.user.token;
            this.loggedIn = true;
        }
    },

    login(data){
        this.loggedIn = true;
        this.token = data.access_token;
        this.user = data.user;

        console.log(data);

        cookies.set("user", JSON.stringify({
            id:data.id,
            email:data.email,
            roles:data.roles,
            token:this.token
        }));
    },

    logout(){
        this.loggedIn = false;
        this.user = null;
        this.token = null;
        cookies.remove("user");
    }
}