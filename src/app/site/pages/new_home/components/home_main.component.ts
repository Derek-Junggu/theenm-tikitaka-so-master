import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import QueryParams from 'src/app/models/params/query.params';
import { ModelStoreService } from 'src/app/service/model-store.service';
import { BroadcastService } from 'src/app/share/app-share/broadcast/broadcast-event.service';
import { Subscriber, Subscription } from 'rxjs';
import { BroadcastValue } from 'src/app/share/app-share/broadcast/broadcast-event';
import { PostModel } from 'src/app/models/posts/post.model';
import { UsersService } from 'src/app/service/users.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-new-home-main',
  templateUrl: './home_main.component.html',
  styleUrls: ['./home_main.component.scss']
})
export class newHomeMainComponent implements OnInit {

  constructor(private router: Router, private _posts: PostService,
    private _category: CategoryService,
    private _users: UsersService, private _api: ApiService, private broadcastService: BroadcastService) { }

  isLoading = false;
  qp = new QueryParams();
  hashtag = [];
  tags = ['코로나','COVID-19','등교중지','이태원','클럽','집콕','마스크','해시태그명'];
  articles = [];  
  recentArticles = ['쓱쓱싹싹놀이터','금융어플리케이션','해외투자뉴스소식','바이오폭락의손의 주식','로스트아크','판타지','일상나누기','코로나 바이러스 갤러리','게임프리크'];
  broadcastWatcher : Subscription;

  get _store(): ModelStoreService {
    return this._api._store;
  }

  ngOnInit(): void {
    this.broadcastWatcher = this.broadcastService
      .on(BroadcastValue.HEAD_CATEGORY_SELECT)
      .subscribe((data: any) => {
          console.log(data)
          this.loadItems(data.attrs)
      })
  }

  async loadItems(attrs) {
    const ftag = `loadItems(),`;
    try {

      //await this.loadNotice();
      this.isLoading = true;

      this.qp.pageSize = 10;
      const res: any = await this._api.reqPostCmd('post_list', attrs);
      //console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.result) {
        this.qp = new QueryParams(res.queryParams);
        for (const item of res.result) {
          const m = new PostModel(item);
          m.categoryModel = await this._category.loadCategoryIfNeed(m.categoryIdx);
          m.galleryModel = await this._category.loadGalleryIfNeed(m.galleryIdx);
          m.userCreator = await this._users.user_get_ifNeed(m.creatorIdx);
          if(m.display === 'Y') this.articles.push(m) 
          this._posts.loadEvalData(m);
        }
        this.articles.map(param => {
          return { 
            ...param,
            regDate : new Date(param.updatedTs)
          }
        })
        console.log(this.articles)
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  onClickLogin() {
    this._api.navigate('/p/a/sign-in');
  }

}
