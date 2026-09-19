import { Component, Input } from "@angular/core";
import { Item } from '@dspace/core/shared/item.model';
import { ItemPageDateFieldComponent } from "src/app/item-page/simple/field-components/specific-field/date/item-page-date-field.component";

@Component({
    selector: 'inpa-date-metadata',
    templateUrl: './date-metadata.component.html',
    styleUrls: ['./date-metadata.component.scss'],
    imports: [
        ItemPageDateFieldComponent
    ],
})
export class DateMetadataComponent {

    @Input() item: Item;


}