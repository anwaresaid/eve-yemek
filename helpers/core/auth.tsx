import cookies from 'js-cookie';
import { allMenuItems } from "../constants";

export default {
    loggedIn:false,
    user:null,
    token:null,
    allowedRoutes:[],

    init(){
        if(cookies.get("user")){
            this.user = JSON.parse(cookies.get("user"));
            this.token = this.user.token;
            this.loggedIn = true;

            this.allowedRoutes = allMenuItems.filter(e=>{
                if(e?.roles){
                    return this.hasRoles(e.roles);
                }else if(e?.items && e.items?.length > 0){
                    return e.items.filter(k=>{
                        if(k?.roles){
                            return this.hasRoles(k.roles);
                        }
                    });
                }

                return false;
            })
            .map(e=>{
                if(e.url){
                    return e.url;
                }else if(e.items){
                    return e.items.map(e=>e?.url);
                }
            })
            .flat();
        }
    },

    login(data){
        this.loggedIn = true;
        this.token = data.access_token;
        this.user = data.user;

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
    },

    isAllowedRoute(route:string){
        return this.allowedRoutes.includes(route);
    },

    hasRoles(roles){
        if(roles?.length > 0 && this.user?.roles?.length > 0)
            return roles?.includes(...this.user?.roles);
        return false;
    }

}