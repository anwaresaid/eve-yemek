import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import React from "react";
import { languageOptions } from "../../helpers/constants";
import { i18n } from "../../language";
import vars from "../../styles/core/variables";
import auth from "../../helpers/core/auth";
type IProps = {
    setHideBar:Function,
    hideBar:boolean
}

const TopBar = (props:IProps) => {

    const router = useRouter();
    const toggleProfile = () =>{
        const toggleProfile= document.querySelector('.menu');
        toggleProfile.classList.toggle('active');
    }

    return (
        <>
            <Card  id='main_context_card'className={"main-context-card" + (props.hideBar  ? "-showBar" : "-hideBar")} >
                <Button id='main_context_burger_btn' icon={"pi " + (props.hideBar ? "pi-chevron-left" : "pi-chevron-right")} className=" p-button-danger" onClick={()=> { props.setHideBar(!props.hideBar) }}/>
                <div className='profileContainer'>
                    <div className='profile' onClick={toggleProfile}>
                        <img className='profileImage' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC'></img>
                        <div className='menu'>
                            <h2>{i18n.t('profile')}</h2>
                            <ul>
                                <li>{auth.user.email}</li>
                                <li><h3>{i18n.t('role')}</h3>{auth.user.roles.length>1?
                                auth.user.roles.map(d => 
                                    d =='customer'&&  i18n.t('customers')+"\n" ||
                                    d=='customer_service' && i18n.t('customerServiceReps')+("\n")||
                                    d=='admin' && i18n.t('admins')+"\n"||
                                    d=='delivery_scout' && i18n.t('deliveryScouts')+"\n" || 
                                    d=='restaurant_owner' && i18n.t('restaurantOwners')+"\n")
                                :auth.user.roles}</li>
                                <li><a href='/auth/logout'>{i18n.t("logout")}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Dropdown  style={{float: 'right', marginRight: '80px'}}
                    id="language"
                    name="language"
                    placeholder="Language"
                    options={languageOptions}
                    value={i18n.language}
                    onChange={(e) => {i18n.changeLanguage(e.value); router.reload();}}
                />
            </Card>
        </>
    )
}

export default TopBar;