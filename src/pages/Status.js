import React, { useState } from "react";
import styled from 'styled-components';
import {
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonToast,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent, IonButtons, IonBackButton, IonCard, IonCardContent
} from "@ionic/react";

import { MobXProviderContext, observer } from "mobx-react";
import { useHistory } from "react-router";
const StyledWrapper = styled.div`
  
height: 100vh;
    background-color: #CCFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
  .gg{
    
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
  p{
    
    color: white;
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
  
}
   
`

const Status = () => {


  return (


    <IonPage >
      <IonContent class="masters">
      <StyledWrapper>

          สถานะ
        </StyledWrapper>
      </IonContent>
    </IonPage>


  );
};

export default observer(Status);
