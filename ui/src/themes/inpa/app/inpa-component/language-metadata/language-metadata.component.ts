import { JsonPipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Item } from '@dspace/core/shared/item.model';
import { ItemPageFieldComponent } from "src/app/item-page/simple/field-components/specific-field/item-page-field.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'inpa-language-metadata',
    templateUrl: './language-metadata.component.html',
    styleUrls: ['./language-metadata.component.scss'],
    imports: [
        JsonPipe,
        TranslateModule],
})
export class LanguageMetadataComponent extends ItemPageFieldComponent {

    @Input() item: Item;
    get data(): string {
        return this.item?.firstMetadataValue('dc.language.iso');
    }


}