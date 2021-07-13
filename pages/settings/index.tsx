import React from 'react';
import SettingsAdmin from '../../components/settingsAdmin';
import SettingsCustomerService from '../../components/settingsCustomerService';
import SettingsOwner from '../../components/settingsOwner';
import auth from '../../helpers/core/auth';
import { i18n } from '../../language';

const index = () => {

  const renderSettings = () => {
    const is_admin = auth.hasRoles(["admin"]);
    const is_owner = auth.hasRoles(["restaurant_owner"]);
    const is_customer_service = auth.hasRoles(["customer_service"])

    if(is_admin){
      return <SettingsAdmin/>;
    }else if(is_owner){
      return <SettingsOwner/>;
    }else if(is_customer_service) {
      return <SettingsCustomerService/> 
    }else{
      return "No settings";
    }
  }

  return (
    <>
      <h1 id='settingsRenderHeader'>{i18n.t('settings')}</h1>
      {renderSettings()}
    </>
  )
  
};

export default index;
