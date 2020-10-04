import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

import { trackByRoute } from '../../../shared/utils/track-by';


export const ROUTES: any[] = [
    {
        label: 'DASHBOARDS', type: 'subheading', children: [
            { route: '/auth/admin', label: 'Administrador', icon: 'person', type: 'dropdown', children: [{ route: '/auth/dashboard', label: 'Dashboard', icon: 'dashboard', type: 'link' }] },
        ]
    },
    {
        label: 'ADMINISTRADOR', type: 'subheading', children: [
            { route: '/auth/categorias', label: 'Categorias', icon: 'person', type: 'link' },
            { route: '/auth/movimentacoes', label: 'Movimentações', icon: 'person', type: 'link' },
            { route: '/table-list', label: 'A fazer', icon: 'content_paste', type: 'link' },
            { route: '/auth/agendamento', label: 'Agendamentos', icon: 'schedule', type: 'link' },
        ]
    },
    {
        label: 'CONFIGURAÇÕES', type: 'subheading', children: [
            { route: '/typography', label: 'Documentos', icon: 'library_books', type: 'link' },
            { route: '/auth/customizar', label: 'Layout e Cores', icon: 'bubble_chart', type: 'link' },
            { route: '/auth/exemplo', label: 'Tela de Exemplo', icon: 'bubble_chart', type: 'link' },
            { route: '/notifications', label: 'Notificações', icon: 'notifications', type: 'link' },
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

    trackByRoute = trackByRoute;

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private navigationService: NavigationService,
        private _media: MediaMatcher,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any
    ) {
        this.mobileQuery = _media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.documentElement = document.documentElement;
    }

    onConfig(): void {
        this._router.navigate([`../auth/customizar`], { relativeTo: this._activatedRoute });
    }

    logout(): void {
        localStorage.clear();
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
