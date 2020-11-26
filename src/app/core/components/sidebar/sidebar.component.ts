import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { StyleService } from 'src/app/shared/services/style.service';

import { trackByRoute } from '../../../shared/utils/track-by';


export const ROUTES: any[] = [
  {
    label: 'DASHBOARDS', type: 'subheading', children: [
      { route: '/auth/dashboard', label: 'Dashboard', icon: 'insert_chart_outlined', type: 'link' }
    ]
  },
  {
    label: 'ADMINISTRADOR', type: 'subheading', children: [
      { route: '/auth/contas', label: 'Contas', icon: 'account_balance_wallet', type: 'link' },
      { route: '/auth/categorias', label: 'Categorias', icon: 'category', type: 'link' },
      { route: '/auth/planejamento', label: 'Planejamento', icon: 'card_travel', type: 'link' },
      { route: '/auth/movimentacoes', label: 'Movimentações', icon: 'import_export', type: 'link' },
      { route: '/auth/objetivos', label: 'Objetivos', icon: 'done', type: 'link' },
      { route: '/auth/calendario', label: 'Calendário', icon: 'event', type: 'link' },
    ]
  },
  {
    label: 'CONFIGURAÇÕES', type: 'subheading', children: [
      { route: '/auth/customizar', label: 'Layout e Cores', icon: 'bubble_chart', type: 'link' },
      { route: '/auth/perfil', label: 'Perfil', icon: 'account_circle', type: 'link' },
    ]
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  // items = this.navigationService.items;
  items = ROUTES;
  selectedItem;

  documentElement;
  fullScreenOpened = false;

  user: any;
  userProfile$: Observable<string>;

  trackByRoute = trackByRoute;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private navigationService: NavigationService,
    private _media: MediaMatcher,
    private _styleService: StyleService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: any
  ) {
    this.mobileQuery = _media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userProfile$ = this._styleService.image$;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.documentElement = document.documentElement;
  }

  onProfile(): void {
    this._router.navigate([`../auth/perfil`], { relativeTo: this._activatedRoute });
  }

  onConfig(): void {
    this._router.navigate([`../auth/customizar`], { relativeTo: this._activatedRoute });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }

  openFullScreen(): void {
    if (this.documentElement.requestFullscreen) {
      this.documentElement.requestFullscreen();
    } else if (this.documentElement.mozRequestFullScreen) {
      /* Firefox */
      this.documentElement.mozRequestFullScreen();
    } else if (this.documentElement.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.documentElement.webkitRequestFullscreen();
    } else if (this.documentElement.msRequestFullscreen) {
      /* IE/Edge */
      this.documentElement.msRequestFullscreen();
    }
    this.fullScreenOpened = true;
  }

  closeFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }

    this.fullScreenOpened = false;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
