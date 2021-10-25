import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  category = []

  ngOnInit(): void {
  }

  // onClickLsnMall() {
  //   document.location.href = environment.lsnMallUrl;
  // }

  get innerWidth(): number {
    return window.innerWidth;
  } 

  onSelectMenu(url) {
    this.router.navigateByUrl(url);
  }

}
