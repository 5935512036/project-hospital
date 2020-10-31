import React, { useState } from "react";
import styled from 'styled-components';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonText,
  IonPage,
  IonContent,
  IonCard,
  IonCardContent

} from "@ionic/react";
import { useHistory } from "react-router";
import { observer, MobXProviderContext } from "mobx-react";


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
    height: 70vh;
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
    margin-top: 14px;
  }
  p{
    margin-top: 20px;
    color: black;
  }
  
}
   
`
const LoginPage = () => {
  const { store } = React.useContext(MobXProviderContext);
  let { isAuth, initializationError } = store;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInfo, setErrorInfo] = useState({});


  const _doLogin = async () => {
    try {
      let r = await store.doLogin(email, password);
      if (r.code) {
        throw r;
      }
      setErrorInfo({});
      return history.push("/tabs/home");
    } catch (e) {
      setErrorInfo({ showErrorToast: true, errMsg: e.message });
      return false;
    }
  };

  return (

    <IonPage >
      <IonContent class="masters">
        <StyledWrapper>
          <IonCard className='contianer'>
            <IonCardContent>
              <h1 className='title'>กรุณาเข้าสู่ระบบ</h1>
              <div className='boder'></div>
              <p>อีเมลผู้ใช้</p>
              <IonItem className="input" >
                <IonInput
                  type="email"
                  onIonChange={(e) => {
                    setEmail(e.detail.value);
                  }}
                  name="email"
                />
              </IonItem>
              <p>รหัสผ่าน</p>
              <IonItem className="input" >
                <IonInput
                  type="password"
                  onIonChange={(e) => {
                    setPassword(e.detail.value);
                  }}
                  name="password"
                />
              </IonItem>
              <div style={{ padding: 10, paddingTop: 20 }}>
                <IonButton
                  expand="full"
                  style={{ margin: 14 }}
                  onClick={(e) => {
                    if (!e.currentTarget) {
                      return;
                    }
                    e.preventDefault();
                    _doLogin(history);
                  }}
                >
                  {isAuth ? "Logged In" : "เข้าสู่ระบบ"}
                </IonButton>
                <IonButton
                  expand="full"
                  style={{ margin: 14 }}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/register");
                  }}
                >
                  สมัครสมาชิก
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </StyledWrapper>
      </IonContent>
    </IonPage>

  );
};

export default observer(LoginPage);
