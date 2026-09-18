import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare global {
  interface Window {
    _altmetric_embed_init?: (context?: HTMLElement | string) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AltmetricScriptService {

  private loaded = false;
  private loading?: Promise<void>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  load(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    if (this.loaded && window._altmetric_embed_init) {
      return Promise.resolve();
    }

    if (this.loading) {
      return this.loading;
    }

    this.loading = new Promise<void>((resolve, reject) => {

      const existingScript = this.document.querySelector(
        'script[src="https://embed.altmetric.com/assets/embed.js"]',
      );

      if (existingScript) {
        this.loaded = true;
        resolve();
        return;
      }

      const script = this.document.createElement('script');

      script.type = 'text/javascript';
      script.src = 'https://embed.altmetric.com/assets/embed.js';
      script.async = true;

      script.onload = () => {
        this.loaded = true;
        resolve();
      };

      script.onerror = () => {
        this.loading = undefined;
        reject(
          new Error('Não foi possível carregar o Altmetric embed.js'),
        );
      };

      this.document.body.appendChild(script);
    });

    return this.loading;
  }

  initialize(element?: HTMLElement): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (typeof window._altmetric_embed_init === 'function') {
      window._altmetric_embed_init(element);
    }
  }
}