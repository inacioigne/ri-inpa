// import { AsyncPipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Item } from '@dspace/core/shared/item.model';
import { ItemPageFieldComponent } from "src/app/item-page/simple/field-components/specific-field/item-page-field.component";

@Component({
    selector: 'inpa-date-metadata',
    templateUrl: './date-metadata.component.html',
    styleUrls: ['./date-metadata.component.scss'],
    imports: [
        // AsyncPipe,
    ],
})
export class DateMetadataComponent extends ItemPageFieldComponent  {

    @Input() item: Item;
    get data(): string {
        return this.item?.firstMetadataValue('dc.date.issued') ?? '';
    }


}