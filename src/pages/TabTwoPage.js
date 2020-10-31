import React, {useState} from "react";
import { useHistory } from "react-router";
import {
  IonItem,
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonAlert
} from "@ionic/react";
// MOBX
import { MobXProviderContext } from "mobx-react";

const TabTwoPage = () => {
  const history = useHistory();
  const { store } = React.useContext(MobXProviderContext);
  const [showAlert4, setShowAlert4] = useState(false);
  const [name, setname] = useState({});
  const [email, setEmail] = useState({});
  const [position, setposition] = useState({});
  const [phone, setphone] = useState({});
  const [department, setdepartment] = useState({});
  const _doUpdate = async () => {
    try {
      await store.doUpdate({
        email,
        name,
        position,
        phone,
        department,
      });
    } catch (e) {
      console.log(e);
    }
  };
  let user = store.activeUser;
  console.log(user);
  return user ? (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary"></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="fixed">ชื่อ - สกุล</IonLabel>
          <IonLabel>{user.name}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">E-mail</IonLabel>
          <IonLabel>{user.email}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">แผนก</IonLabel>
          <IonLabel>{user.department}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">ต่ำแหน่ง</IonLabel>
          <IonLabel>{user.position}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">เบอร์โทร</IonLabel>
          <IonLabel>{user.phone}</IonLabel>
        </IonItem>
       

        <IonButton onClick={() => setShowAlert4(true)} expand="block">แก้ไขข้อมูล</IonButton>
        <IonAlert
          isOpen={showAlert4}
          onDidDismiss={() => setShowAlert4(false)}
          cssClass='my-custom-class'
          header={'แก้ไขข้อมูล'}
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'ชื่อ - สกุล'
            },
            {
              name: 'email',
              type: 'email',
              placeholder: 'E-mail'
            },
            {
              name: 'department',
              type: 'text',
              placeholder: 'แผนก'
            },
            // input date with min & max
            {
              name: 'position',
              type: 'text',
              placeholder: 'ต่ำแหน่ง'
            },
            // input date without min nor max
            {
              name: 'phone',
              type: 'number',
              placeholder: 'เบอร์โทร',
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'Ok',
              handler: (alertData) => {
                console.log('Confirm Ok',alertData);
                setname(alertData.name)
                setEmail(alertData.email)
                setposition(alertData.position)
                setdepartment(alertData.department)
                setphone(alertData.phone)
                _doUpdate(history);
              }
            }
          ]}
        />
        
        <IonItem text-wrap lines="none" style={{ padding: 10 }}>
          {user.bio}
        </IonItem>
        
      </IonContent>
      
      
    </IonPage>
  ) : null;
};

export default TabTwoPage;
