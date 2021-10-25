import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-home-main',
  templateUrl: './home_main.component.html',
  styles: [
  ]
})
export class newHomeMainComponent implements OnInit {

  constructor(private router: Router, private _category: CategoryService) { }

  isLoading = false;
  category = []

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    const ftag = `loadCategories(),`;
    try {
      this.isLoading = true;
      await this._category.loadItemsIfNeed();
      this.isLoading = false;
      this.category = this._category.items;
      console.log(ftag, 'items=', this._category.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

}
