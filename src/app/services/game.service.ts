import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private isGameStarted = false;
  private _size: number;
  private _sizes = [16, 12, 8];

  get size(): number {
    return this._size || this._sizes[0];
  }

  get sizes(): number[] {
    return this._sizes;
  }

  setSize(size: number) {
    this._size = size;
    this.isGameStarted = true;
  }
}
