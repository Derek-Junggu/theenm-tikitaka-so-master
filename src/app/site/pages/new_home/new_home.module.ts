import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './new_home-routing.module';
import { newHomeComponent } from './new_home.component';
import { newHomeMainComponent } from './components/home_main.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    newHomeComponent,
    newHomeMainComponent,
  ],
  imports: [
    YouTubePlayerModule,
    CommonModule,
    HomeRoutingModule,
    AppShareModule,
  ]
})
export class HomeModule { }
