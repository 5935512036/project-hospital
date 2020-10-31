import { Route, Redirect } from "react-router";
import React from "react";
import { useHistory } from "react-router";
import TabOnePage from "../pages/TabOnePage";
import TabTwoPage from "../pages/TabTwoPage";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";

// MOBX
import { observer } from "mobx-react";
import TabOneDetailPage from "./TabOneDetailPage";
import RepairNoti from "./RepairNoti";
import Status from "./Status";
import { MobXProviderContext } from "mobx-react";

const HomePage = () => {
  const history = useHistory();
  const { store } = React.useContext(MobXProviderContext);
  const _onLogoutClick = async (e) => {
    e.preventDefault();
    await store.doLogout();
    return history.replace("/login");
  };
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" exact={true}>
          <TabOnePage />
        </Route>

        <Route path="/tabs/tab1-detail/:id" exact={true}>
          <TabOneDetailPage />
        </Route>

        <Route path="/tabs/settings" exact={true}>
          <TabTwoPage />
        </Route>
        
        <Route path="/tabs/repair" exact={true}>
          <RepairNoti/>
        </Route>
        <Route path="/tabs/status" exact={true}>
          <Status/>
        </Route>
        
        

        <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/home">
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton  
              onClick={(e) => {
            _onLogoutClick(e);
          }}>
          <IonLabel>LOGOUT</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default observer(HomePage);
