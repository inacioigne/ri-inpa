import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  PLATFORM_ID,
  ViewChild,
  Inject,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { AltmetricScriptService } from './altmetric-script.service';

@Component({
  selector: 'inpa-altmetric-badge',
  templateUrl: './altmetric-badge.component.html',
  styleUrls: ['./altmetric-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltmetricBadgeComponent implements AfterViewInit {

  @Input() doi?: string;


  @ViewChild('altmetricContainer', { static: false })
  altmetricContainer?: ElementRef<HTMLElement>;

  constructor(
    private altmetricScriptService: AltmetricScriptService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.identifier) {
      return;
    }

    this.altmetricScriptService
      .load()
      .then(() => {

        if (!this.altmetricContainer) {
          return;
        }

        this.altmetricScriptService.initialize(
          this.altmetricContainer.nativeElement,
        );

      })
      .catch((error) => {
        console.error(
          '[Altmetric] Erro ao carregar badge:',
          error,
        );
      });
  }

  get identifier(): string | undefined {

    if (this.doi) {
      return this.cleanDoi(this.doi);
    }

    return undefined;
  }

  private cleanDoi(doi: string): string {

    return doi
      .trim()
      .replace(/^https?:\/\/doi\.org\//i, '')
      .replace(/^doi:\s*/i, '');
  }
}