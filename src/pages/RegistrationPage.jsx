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

const RegistrationPage = () => {
  const { store } = React.useContext(MobXProviderContext);
  const history = useHistory();

  const [ErrorInfo, setErrorInfo] = useState({});
  const [name, setname] = useState({});
  const [email, setEmail] = useState({});
  const [position, setposition] = useState({});
  const [phone, setphone] = useState({});
  const [password, setpassword] = useState({});
  const [department, setdepartment] = useState({});
  const [imageUrl, setimageUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlZdpbK9Vj39UQbfibrytDSsEKyleVDDF3AG2vELVt7lcSImgo');

  const handlechargefile = e => {
    const reader = new FileReader();
    reader.onload = e => {
        setimageUrl(e.target.result);
    }
    if (e.target.files[0])
        reader.readAsDataURL(e.target.files[0])
}

  const _doCreateAccount = async () => {
   
    try {
      
      let r = await store.doCreateUser({
        email,
        password,
        name,
        position,
        phone,
        department,
        imageUrl
      });

      if (r.code) {
        throw r;
      } else {
        history.replace("/tabs/home");
      }
    } catch (e) {
      console.log(e);
      setErrorInfo({ showErrorToast: true, errMsg: e.message });
    }
  };

  return (


    <IonPage >
      <IonContent class="masters">
        <StyledWrapper>
          <IonCard className='contianer'>
            <IonCardContent>
              <h1 className='title'>สมัครสมาชิก</h1>
              <div className='boder'></div>
              <p>ชื่อ - สกุล</p>
              <IonInput className="input"

                name="name"
                type="text"
                onIonChange={(e) => {
                  setname(e.detail.value);
                }}
              />
              <p>อีเมลผู้ใช้</p>
              <IonInput className="input"
                name="email"
                type="email"
                onIonChange={(e) => {
                  setEmail(e.detail.value);
                }}
              />

              <div className="all">
                <div className="kob">
                  <p>ต่ำแหน่ง</p>
                  <IonInput className="input"
                    name="position"
                    type="text"
                    onIonChange={(e) => {
                      setposition(e.detail.value);
                    }}
                  />
                </div>
                <div>
                  <p>แผนก</p>
                  <IonInput className="input"
                    name="department"
                    type="text"
                    onIonChange={(e) => {
                      setdepartment(e.detail.value);
                    }}
                  />
                </div>


              </div>

              <p>เบอร์ติดต่อ</p>
              <IonInput className="input"
                name="phone"
                type="number"
                onIonChange={(e) => {
                  setphone(e.detail.value);
                }}
              />
              <p>รหัสผ่าน</p>
              <IonInput className="input"
                name="password"
                type="password"
                onIonChange={(e) => {
                  setpassword(e.detail.value);
                }}
              />
              <p>เลือกรูป<input type="file" id="myFile" accept="image/*" onChange={handlechargefile} ></input></p> 






              <div >
                <IonButton
                  expand="full"
                  style={{ margin: 14 }}
                  onClick={(e) => {
                    if (!e.currentTarget) {
                      return;
                    }
                    e.preventDefault();
                    _doCreateAccount(history);
                  }}
                >
                  ลงทะเบียน
          </IonButton>
                <IonButton
                  expand="full"
                  style={{ margin: 14 }}
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  ยกเลิก
          </IonButton>
              </div>


            </IonCardContent>
          </IonCard>
        </StyledWrapper>
      </IonContent>
    </IonPage>


  );
};

export default observer(RegistrationPage);
