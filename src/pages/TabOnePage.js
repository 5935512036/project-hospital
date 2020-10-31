import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import { useHistory } from "react-router";
import styled from 'styled-components';
import {
  IonItem,
  IonContent,
  IonText,
  IonList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import context from '../img/context.png';
import data from '../img/data.png';
import setting from '../img/setting.png';

// MOBX
import { MobXProviderContext, observer } from "mobx-react";




const StyledWrapper = styled.div`
  

   
        background-color: aquamarine;
        height: 90vh;
        img {
          border-radius: 50%;
          max-width: 30%;
          border: 0;
          margin-top: 16px;
      }

.text{
  margin: 0px;
  font-size: smaller;
  padding-bottom: 10px;
  padding-left: 2px;
}
.box{
  text-align-last: center;
}
.card{
  background-color: #dbf5f5;
}
.hg{
  text-align: -webkit-center;
}   
.img1{
  height: 13vh;
    width: 13vw;
}

    `

const TabOnePage = ({ addItem }) => {
  const history = useHistory();
  const [refreshing, setRefreshing] = useState(false);
  

  const { store } = React.useContext(MobXProviderContext)

  /**
   *
   */
  const _renderItems = () => {
    return store.itemEntries.map(([key, value]) => {
      return (
        <IonItemSliding key={key}>
          <IonItem
            onClick={(e) => {
              history.push("/tabs/tab1-detail/" + key);
            }}
          >
            <IonLabel text-wrap>
              <IonText color="primary">
                <h3>{value.content.email}</h3>
              </IonText>
              <p>{value.content.body}</p>
              <IonText color="secondary">
                <p>{value.content.dueDate}</p>
              </IonText>
            </IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption onClick={(e) => _delete(e, value)} color="danger">
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      );
    });
  };

  const _delete = async (_e, _item) => {
    // close the item
    await _e.target.parentElement.parentElement.closeOpened();
    let result = await store.deleteItem({ id: _item.id });
    if (result) {
      alert("item deleted " + _item.id);
    }
  };

  const _doRefresh = async (event) => {
    console.log("Begin async operation");
    setRefreshing(true);
    await store.loadData();
    setRefreshing(false);
    console.log("Async operation has ended");
  };

  const _renderList = () => {
    return (
      <IonList>
        <IonRefresher onIonRefresh={(e) => _doRefresh(e)}>
          <IonRefresherContent
            style={{ color: "black" }}
            refreshingText="Refreshing..."
            padding
          />
        </IonRefresher>
        <div style={{ paddingTop: refreshing ? 40 : 0 }}>{_renderItems()}</div>
      </IonList>
    );
  };

  if (!store.activeUser) return null;

  return (
    <IonPage>
      <StyledWrapper>

        <IonItem lines="none" >
          <div className="box">
            <img src={store.activeUser.imageUrl} width='50%' height='50%' />
            <h1 className="text">ผู้ใช้งาน: {store.activeUser.name}</h1>
          </div>
        </IonItem>
        <ion-card className='card'>


          <ion-grid>
            <ion-row>
              <ion-col col-12>
                <div className='hg'>
                  <img src={data} alt="data" className='img1'/>;
                  {/* <img src={store.activeUser.imageUrl} width='50%' height='50%' /> */}
                  <IonButton
                  expand="full"
                  style={{ margin: 14 }}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/tabs/settings");
                  }}
                >
                  ข้อมูลส่วนตัว
                </IonButton>
           
                  
                </div>
              </ion-col>
              <ion-col col-12>
                <div className='hg'>
                  <img src={setting} alt="setting" className='img1' />
                  <IonButton
                  expand="full"
                  style={{ margin: 14 }}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/tabs/repair");
                  }}
                >
                  แจ้งซ่อม
                </IonButton>
                 
                </div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col col-6 >
                <div className='hg'>
                  <img src={context} alt="context"/>
                  <IonButton
                 
                  expand="full"
                  style={{ margin: 14 }}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/tabs/status");
                  }}
                >
                  ติดตามการแจ้งซ่อม
                </IonButton>
                
                  
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>


        </ion-card>
      </StyledWrapper>


    </IonPage>
  );
};

export default observer(TabOnePage);
