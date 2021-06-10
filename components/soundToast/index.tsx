import { Toast } from 'primereact/toast';
import React, { useEffect } from 'react';

const index = ({ toastRef }) => {
  const notificationSoundPath = '/notification_sound.mp3';
  const notificationSound = new Audio(notificationSoundPath);

  useEffect(() => {
    notificationSound.play();
  }, []);

  return (
    <div id='soundToastDiv'>
      <Toast id='sountToast' ref={toastRef} position='top-right' />
    </div>
  );
};

export default index;
