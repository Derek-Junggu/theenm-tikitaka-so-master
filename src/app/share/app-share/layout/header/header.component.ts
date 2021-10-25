import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import QueryParams from 'src/app/models/params/query.params';
import { ApiService } from 'src/app/service/api.service';
import { BroadcastService } from 'src/app/share/app-share/broadcast/broadcast-event.service'
import { ModelStoreService } from 'src/app/service/model-store.service';
import { Router } from '@angular/router';
import { BroadcastValue } from '../../broadcast/broadcast-event';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private _category: CategoryService, public _api: ApiService, private broadcastService: BroadcastService) { }

  isLoading = false;
  searchMode = false;
  qp = new QueryParams();
  category = []
  galleryModels = []

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    const ftag = `loadCategories(),`;
    try {
      this.isLoading = true;
      await this._category.loadItemsIfNeed();
      this.isLoading = false;
      this.category = this._category.items.filter(n=> n.display === 'Y');
      await this._category.loadGallerysIfNeed(this.category[0]);
      this.galleryModels = this.category[0].galleryModels.filter(n=> n.display === 'Y');
      this.broadcastService.broadcast(BroadcastValue.HEAD_CATEGORY_SELECT, this.category[0])
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  async categoryClick(categoryModel) {
    const ftag = `on_category_click(),`;
    try {
      this.isLoading = true;
      await this._category.loadGallerysIfNeed(categoryModel);
      this.isLoading = false;
      this.galleryModels = categoryModel.galleryModels.filter(n=> n.display === 'Y');
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get innerWidth(): number {
    return window.innerWidth;
  }

  get _store(): ModelStoreService {
    return this._api._store;
  }

  onSelectItem(categoryModel) {
    console.log(categoryModel)
    this.broadcastService.broadcast(BroadcastValue.HEAD_CATEGORY_SELECT, categoryModel)
    //this.router.navigateByUrl(url);
  }

  onEnterSearch() {
    if (!this.qp.searchWord) {
      return;
    }
    this._category._api.navigate('/p/h/search', {
      queryParams: this.qp.getAttrs()
    });
  }

}
