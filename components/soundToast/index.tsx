import { Toast } from 'primereact/toast';
import React, { useEffect } from 'react';
import { useState } from 'react';

const index = ({ toastRef, orderStatus }) => {
  const notificationSoundPath = '/notification_sound.mp3';
  // const notificationSound = new Audio(notificationSoundPath);
  const [audio] = useState(typeof Audio !== "undefined" && new Audio(notificationSoundPath));

  const playSound = () => {
    if(orderStatus === true){
      audio.play();
    }
  }

  return (
    <div id='soundToastDiv'>
      {playSound()}
      <Toast id='sountToast' ref={toastRef} position='top-right' />
    </div>
  );
};

export default index;
