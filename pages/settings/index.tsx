import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { listSettings } from '../../store/actions/settings.action';
import { TabView, TabPanel } from 'primereact/tabview';
import * as S from '../../styles/food/create-food/food.create.style';
import { Button } from 'primereact/button';

const index = () => {
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const res = useSelector((state: RootState) => state.listFoodCategory);
  const { loading, success, settings } = res;

  useEffect(() => {
    dispatch(listSettings());
  }, [dispatch]);

  const GeneralSettings = () => {
    return <h2>General Settings Here</h2>;
  };

  const NotificationSettings = () => {
    return <h2>Notification Settings Here</h2>;
  };

  const SMSGatewaySettings = () => {
    return <h2>SMS Gateway Settings Here</h2>;
  };

  const GoogleMapsSettings = () => {
    return <h2>Google Maps Settings Here</h2>;
  };

  const PaymentSettings = () => {
    return <h2>Payment Settings Here</h2>;
  };

  const updateSettings = (e: any) => {
    e.preventDefault();
    console.log('updated');
  };

  return (
    <div>
      <h2>Eve Yemek Ayarlari</h2>
      <form onSubmit={updateSettings}>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header='Genel'>
            <GeneralSettings />
          </TabPanel>
          <TabPanel header='Bildirim Gonder'>
            <NotificationSettings />
          </TabPanel>
          <TabPanel header='SMS Gateway'>
            <SMSGatewaySettings />
          </TabPanel>
          <TabPanel header='Google Maps'>
            <GoogleMapsSettings />
          </TabPanel>
          <TabPanel header='Odeme Gateway'>
            <PaymentSettings />
          </TabPanel>
        </TabView>

        <S.SubmitBtn>
          <Button type='submit' label='Submit' />
        </S.SubmitBtn>
      </form>
    </div>
  );
};

export default index;
