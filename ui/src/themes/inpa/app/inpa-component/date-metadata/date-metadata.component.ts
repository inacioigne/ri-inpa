import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Item } from '@dspace/core/shared/item.model';
// import { ItemPageDateFieldComponent } from "src/app/item-page/simple/field-components/specific-field/date/item-page-date-field.component";
import { ItemPageFieldComponent } from "src/app/item-page/simple/field-components/specific-field/item-page-field.component";

@Component({
    selector: 'inpa-date-metadata',
    templateUrl: './date-metadata.component.html',
    styleUrls: ['./date-metadata.component.scss'],
    imports: [
        AsyncPipe,
        JsonPipe
        // ItemPageDateFieldComponent
    ],
})
export class DateMetadataComponent extends ItemPageFieldComponent  {

    @Input() item: Item;


}