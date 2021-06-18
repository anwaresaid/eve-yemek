import React from 'react';
import SettingsAdmin from '../../components/settingsAdmin';
import SettingsOwner from '../../components/settingsOwner';
import auth from '../../helpers/core/auth';
import { i18n } from '../../language';

const index = () => {

  const renderSettings = () => {
    const is_admin = auth.hasRoles(["admin"]);
    const is_owner = auth.hasRoles(["restaurant_owner"]);

    if(is_admin){
      return <SettingsAdmin/>;
    }else if(is_owner){
      return <SettingsOwner/>;
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
