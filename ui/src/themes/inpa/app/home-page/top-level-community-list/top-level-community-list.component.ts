import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopLevelCommunityListComponent as BaseComponent } from '../../../../../app/home-page/top-level-community-list/top-level-community-list.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';

@Component({
  selector: 'ds-themed-top-level-community-list',
  styleUrls: ['./top-level-community-list.component.scss'],
  templateUrl: './top-level-community-list.component.html',
  imports: [
    AsyncPipe,
    ThemedLoadingComponent,
    RouterModule

  ],
})
export class TopLevelCommunityListComponent extends BaseComponent {
  public collections = [
    {
      link: '/entities/journal/27ea2d7b-8872-4425-a015-a01a15f2eec7',
      image: 'assets/inpa/images/collections/boletim-rr.png',
      title: 'Boletim Informativo: Núcleo de Roraima'
    },
    {
      link: '/communities/26886ea1-e850-4399-974a-d128a4bc3406',
      image: 'assets/inpa/images/collections/books.png',
      title: 'Livros'
    },
    {
      link: '/entities/journal/39b2e288-30a8-4e84-b386-5c7bfdcbdcac',
      image: 'assets/inpa/images/collections/amazonia.png',
      title: 'Revista Amazoniana'
    },
    {
      link: '/communities/63d1e74d-163f-4741-a505-d20c4615b410',
      image: 'assets/inpa/images/collections/tede.png',
      title: 'Teses & Dissertações'
    }
  ];
}
