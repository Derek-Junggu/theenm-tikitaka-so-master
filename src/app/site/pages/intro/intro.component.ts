import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteModel } from 'src/app/models/site/site.model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  animations: [fadeIn,],
})
export class IntroComponent implements OnInit {

  isLoading = false;

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    const urls = this._api.currentUrl.split('/');
    if (urls.length < 2) {
      this._api.config.gotoSiteList();
      return;
    }
    const siteId = urls[1];
    this.loadSiteIfNeed(siteId);
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      const routeParams = this._aRoute.snapshot.paramMap;
      const siteId = routeParams.get('siteId');
    });
  }

  get siteModel(): SiteModel {
    return this._api.config.siteModel;
  }

  async loadSiteIfNeed(siteId: string) {
    const ftag = `(loadSiteIfNeed(${siteId})),`;
    try {

      console.log(ftag, 'siteModel=', this._api.siteModel);
      if (this._api.siteModel?.siteId === siteId) {
        this._api.navigate(`/p/h`);
        return;
      }
      this._api.config.siteModel = null;
      this.isLoading = true;
      const error = await this._api.reqGetSite(siteId);
      this.isLoading = false;
      // console.log(ftag, 'res=', res);
      if (this._api.siteModel) {
        this._api.navigate(`/p/h`);
        return;
      }
      this._api.config.gotoSiteList();
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }

  }


}
