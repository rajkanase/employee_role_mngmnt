import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  showMessage(message: string) {
    this.snackBar.open(message)._dismissAfter(3000);
  }
}
