import React, { useState } from "react";
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonPage, IonItemDivider } from '@ionic/react';

import styled from 'styled-components';


import { MobXProviderContext, observer } from "mobx-react";
import { useHistory } from "react-router";





const StyledWrapper = styled.div`
  
  height: 100vh;
  background-color: #CCFFFF;

  .conti{
     text-align: center;
  }
  .text{
    font-size: 15px ;  
    margin: 0px 0px 13px 0px;
  }


  .bnt{
    display: flex;
    justify-content: center;
  }
  .tesxt{
    color: red;
  }
  .contianer{
    height: 90vh;
    background-color: #339999;
    width: 90vw; 
  }
  .title{
    display: flex;
    justify-content: center;
    color: white;
  }
  .boder{
    border-color: black;
    border-bottom: solid;
    margin-top: 9px;
    margin-bottom: 7px;
  }
 
  .input{
    background-color: white;
    border-radius: 10px;
    height: 32px;
    padding-left: 13px;
  }
  .all{
    display: flex;
    
  }
  .kob{
    margin-right: 10px;
  }
  .box{
    height: 17vh;
    width: 30vw;
  }
  
}
   
`

const Repair = () => {

  const { store } = React.useContext(MobXProviderContext)
  const [Position, setPosition] = useState('');  
  const [imageUrl, setimageUrl] = useState('');
  const [Topic,setTopic] = useState('')

console.log(Position);
console.log(Topic);
  const handlechargefile = e => {
    const reader = new FileReader();
    reader.onload = e => {
      setimageUrl(e.target.result);
    }
    if (e.target.files[0])
      reader.readAsDataURL(e.target.files[0])
  }
  return (


    <IonPage >
      <IonContent class="masters">
        <StyledWrapper>

          <div className="conti" >
            <img className="box" src={store.activeUser.imageUrl} />
            <h1 className="text">ผู้ใช้งาน: {store.activeUser.name}</h1>
          </div>
          <div>

       
            <ion-item>
              <ion-label>เลือกวันที่แจ้งซ่อม</ion-label>
              <ion-datetime displayFormat="MMM DD, YYYY HH:mm" ></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-label >เรื่องที่แจ้ง:</ion-label>
              <ion-input placeholder="เขียนข้อมูล" ></ion-input>
         
            </ion-item>
            <ion-item>
              <ion-label>รายละเอียดแจ้งซ่อม:</ion-label>
              <ion-input placeholder="เขียนข้อมูล"></ion-input>
            </ion-item>
            <IonItem>
              <IonLabel>แผนก</IonLabel>
              <IonSelect

                interface="popover"
                placeholder="เลือกแผนก"
                onIonChange={e => setPosition(e.detail.value)}
                value={Position}>
                <IonSelectOption value="Sregister">ทะเบียน</IonSelectOption>
                <IonSelectOption value="Smonney">การเงิน</IonSelectOption>
                <IonSelectOption value="Semergen">ฉุกเฉิน</IonSelectOption>
                <IonSelectOption value="Ssick">ผู้ป่วยใน</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>

              <input type="file" id="myFile" accept="image/*" onChange={handlechargefile} ></input>

            </IonItem>
            <div className='btn'>
              <IonButton
                expand="small"
                style={{ margin: 14 }}

              >
                ส่งข้อมูล
          </IonButton>
            </div>

          </div>








        </StyledWrapper>
      </IonContent>
    </IonPage>


  );
};

export default observer(Repair);
