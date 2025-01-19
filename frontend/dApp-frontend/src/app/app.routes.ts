import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MintComponent } from './mint/mint.component';
import { AddwalletComponent } from './addwallet/addwallet.component';
import { BurnComponent } from './burn/burn.component';
import { TxHistoryComponent } from './tx-history/tx-history.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'mint',
        component:MintComponent
    },
    {
        path:'addwallet',
        component:AddwalletComponent
    },
    {
        path:'burn',
        component:BurnComponent
    },
    {
        path:'tx_history',
        component:TxHistoryComponent
    }
];
