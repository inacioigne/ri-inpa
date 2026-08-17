import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
// import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { TopLevelCommunityListComponent as BaseComponent } from '../../../../../app/home-page/top-level-community-list/top-level-community-list.component';
// import { ErrorComponent } from '../../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
// import { ObjectCollectionComponent } from '../../../../../app/shared/object-collection/object-collection.component';
// import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
  selector: 'ds-themed-top-level-community-list',
  styleUrls: ['./top-level-community-list.component.scss'],
  templateUrl: './top-level-community-list.component.html',
  imports: [
    AsyncPipe,
    // ErrorComponent,
    // ObjectCollectionComponent,
    ThemedLoadingComponent,
    // TranslateModule,
    // VarDirective,
    RouterModule

  ],
})
export class TopLevelCommunityListComponent extends BaseComponent {
  public collections = [
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
