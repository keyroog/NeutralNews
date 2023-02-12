import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean = false;
  private loading2: boolean = false;
  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  setLoading2(loading2: boolean) {
    this.loading2 = loading2;
  }

  getLoading2(): boolean {
    return this.loading2;
  }

}
