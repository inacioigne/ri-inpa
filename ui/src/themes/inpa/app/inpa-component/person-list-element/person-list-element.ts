
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ItemDataService } from '@dspace/core/data/item-data.service';
import { RemoteData } from '@dspace/core/data/remote-data';
import { Bitstream } from '@dspace/core/shared/bitstream.model';
import { followLink } from '@dspace/core/shared/follow-link-config.model';
import { Item } from '@dspace/core/shared/item.model';
import { getFirstCompletedRemoteData } from '@dspace/core/shared/operators';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
// import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
// import { OrcidBadgeAndTooltipComponent } from 'src/app/shared/orcid-badge-and-tooltip/orcid-badge-and-tooltip.component';
// import { MetadataDirective } from 'src/app/shared/metadata.directive';


import { ItemMetadataRepresentationListElementComponent } from 'src/app/shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';

@Component({
  selector: 'inpa-person-list-element',
  templateUrl: './person-list-element.html',
  styleUrls: ['./person-list-element.scss'],
  imports: [
    AsyncPipe,
    ThemedThumbnailComponent,
    RouterLink,
    // TruncatableComponent,
    // OrcidBadgeAndTooltipComponent,
    // MetadataDirective
  ],
})
/**
 * The component for displaying an item of the type Person as a metadata field
 */
export class PersonListElementComponent extends ItemMetadataRepresentationListElementComponent {
  thumbnail$: Observable<RemoteData<Bitstream> | null> = of(null);

  constructor(private itemDataService: ItemDataService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.thumbnail$ = this.resolveThumbnail$();
  }

  private resolveThumbnail$(): Observable<RemoteData<Bitstream> | null> {
    if (!this.mdRepresentation?.id) {
      return of(null);
    }

    if (this.mdRepresentation.thumbnail) {
      return this.mdRepresentation.thumbnail as Observable<RemoteData<Bitstream> | null>;
    }

    return this.itemDataService.findById(this.mdRepresentation.id, true, false, followLink('thumbnail')).pipe(
      getFirstCompletedRemoteData<Item>(),
      switchMap((itemRD: RemoteData<Item> | null) => {
        const thumbnail$ = itemRD?.payload?.thumbnail as Observable<RemoteData<Bitstream>> | undefined;
        return (thumbnail$ ?? of(null)) as Observable<RemoteData<Bitstream> | null>;
      }),
    );
  }
}
