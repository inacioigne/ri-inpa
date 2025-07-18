import {
  AsyncPipe,
  NgTemplateOutlet,
  NgFor
} from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { HomeCoarComponent } from '../../../../app/home-page/home-coar/home-coar.component';
import { ThemedHomeNewsComponent } from '../../../../app/home-page/home-news/themed-home-news.component';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { RecentItemListComponent } from '../../../../app/home-page/recent-item-list/recent-item-list.component';
import { ThemedTopLevelCommunityListComponent } from '../../../../app/home-page/top-level-community-list/themed-top-level-community-list.component';
import { SuggestionsPopupComponent } from '../../../../app/notifications/suggestions/popup/suggestions-popup.component';
import { ThemedConfigurationSearchPageComponent } from '../../../../app/search-page/themed-configuration-search-page.component';
import { ThemedSearchFormComponent } from '../../../../app/shared/search-form/themed-search-form.component';

@Component({
  selector: 'ds-themed-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    HomeCoarComponent,
    NgTemplateOutlet,
    RecentItemListComponent,
    SuggestionsPopupComponent,
    ThemedConfigurationSearchPageComponent,
    ThemedHomeNewsComponent,
    ThemedSearchFormComponent,
    ThemedTopLevelCommunityListComponent,
    TranslateModule,
    RouterModule,
    NgFor  
  ],
})
export class HomePageComponent extends BaseComponent {
  public collections = [
    {
      link: '/communities/63a339c3-3ea5-4dce-8b21-d1d0c8d88693',
      image: 'assets/inpa/images/collections/clima-amazonia.png',
      title: 'Boletim de Monitoramento Climático de Grandes Bacias Hidrográficas',
    },
    {
      link: '/collections/6b1997ea-f80f-4255-bb60-0e7b3e3231af',
      image: 'assets/inpa/images/collections/editora-inpa.png',
      title: 'Editora INPA',
    },
     {
      link: '/communities/4e233432-fbd0-4db3-b822-74ad31b0e819',
      image: 'assets/inpa/images/collections/tede.jpg',
      title: 'Tese & Dissertação',
    }
  ]
}
