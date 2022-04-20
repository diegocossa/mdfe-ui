import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingCount = 0;
  showInThisTransaction = true;

  get showLoad() {
    return Boolean(this.loadingCount > 0);
  }

  constructor() {
    // this.startMonitoring();
  }

  show(origin?: string) {
    if (this.showInThisTransaction) {
      setTimeout(() => {
        this.loadingCount++;
      }, 0.0001);
    } else {
      this.showInThisTransaction = true;
    }
  }

  showForSeconds(seconds: number) {
    setTimeout(() => {
      this.show();
    }, seconds * 1000);
    this.dismiss();
  }

  dismiss() {
    setTimeout(() => {
      this.loadingCount--;
    }, 300);
    if (this.loadingCount < 0) {
      this.loadingCount = 0;
    }
  }

  dontShowLoadingOnThisTransaction() {
    this.showInThisTransaction = false;
  }

  startMonitoring() {
    const wait = (ms) => new Promise(res => setTimeout(res, ms));
    const startAsync = async () => {
      let previousValue = this.loadingCount;
      while (true) {
        await wait(5000);
        if (this.loadingCount === previousValue) {
          await wait(2000);
          if (this.loadingCount === previousValue) {
            this.loadingCount = 0;
          }
        } else {
          previousValue = this.loadingCount;
        }
      }
    };
    startAsync();
  }

}
