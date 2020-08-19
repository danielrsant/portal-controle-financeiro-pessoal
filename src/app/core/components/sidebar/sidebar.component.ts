import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';
import { CustomizeService } from 'src/app/shared/services/customize.service';

import { trackByRoute } from '../../../shared/utils/track-by';


export const ROUTES: any[] = [
    { route: '/auth/admin', label: 'Administrador', icon: 'user', type: 'dropdown', children: [{ route: '/auth/dashboard', label: 'Dashboard', icon: 'dashboard', type: 'link' }] },
    { route: '/auth/funcionarios', label: 'Funcionários', icon: 'person', type: 'link' },
    { route: '/table-list', label: 'A fazer', icon: 'content_paste', type: 'link' },
    { route: '/auth/agendamento', label: 'Agendamentos', icon: 'schedule', type: 'link' },
    { route: '/typography', label: 'Documentos', icon: 'library_books', type: 'link' },
    { route: '/customizar', label: 'Configurações', icon: 'bubble_chart', type: 'link' },
    { route: '/notifications', label: 'Notificações', icon: 'notifications', type: 'link' },
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

    trackByRoute = trackByRoute;

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    theme$: Observable<any>;
    onDestroy$ = new Subject<any>();

    constructor(
        private _customizeService: CustomizeService,
        private _changeDetectorRef: ChangeDetectorRef,
        private navigationService: NavigationService,
        private _media: MediaMatcher,
        private _router: Router
        ) {
        this.mobileQuery = _media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.listenTheme();
    }

    listenTheme(): void {
        this.theme$ = this._customizeService.theme;
        this.theme$.pipe(takeUntil(this.onDestroy$)).subscribe();
    }

    ngOnInit(): void { }

    openUserOptions(menu): void{
        menu.openMenu();
    }

    logout() {
        localStorage.clear();
        this._router.navigate(['/login']);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

}