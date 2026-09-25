import { Component, Input } from "@angular/core";
import { Item } from '@dspace/core/shared/item.model';
import { ItemPageFieldComponent } from "src/app/item-page/simple/field-components/specific-field/item-page-field.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'inpa-icon-metadata',
    templateUrl: './icon-metadata.component.html',
    styleUrls: ['./icon-metadata.component.scss'],
    imports: [
        TranslateModule],
})
export class IconMetadataComponent extends ItemPageFieldComponent {

    @Input() item: Item;

    @Input() field: string;

    @Input() label: string;

    @Input() icon: string;

    get data(): string {
        return this.item?.firstMetadataValue(this.field);
    }

    get iconPath(): string {
    return `assets/inpa/images/icons/${this.icon}.svg`;
  }


}