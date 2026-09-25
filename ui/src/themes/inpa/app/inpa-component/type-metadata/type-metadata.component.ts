import { Component, Input } from "@angular/core";
import { Item } from '@dspace/core/shared/item.model';
import { ItemPageFieldComponent } from "src/app/item-page/simple/field-components/specific-field/item-page-field.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'inpa-type-metadata',
    templateUrl: './type-metadata.component.html',
    styleUrls: ['./type-metadata.component.scss'],
    imports: [
        TranslateModule],
})
export class TypeMetadataComponent extends ItemPageFieldComponent {

    @Input() item: Item;
    get data(): string {
        return this.item?.firstMetadataValue('dc.type');
    }

    public slugify(value: string): string {
        return value.toLowerCase().trim().replace(/\s+/g, '-');
    }


}