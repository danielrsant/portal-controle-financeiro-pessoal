import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomizeService } from 'src/app/shared/services/customize.service';

declare interface RouteInfo {
    type: 'item' | 'collapsable';
    icon?: string;
    title: string;
    path: string;
    class: string;
} 

export const ROUTES: RouteInfo[] = [
    { path: '/auth/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', type: 'item' },
    { path: '/auth/funcionarios', title: 'Funcionários', icon: 'person', class: '', type: 'item' },
    { path: '/table-list', title: 'A fazer', icon: 'content_paste', class: '', type: 'item' },
    { path: '/auth/agendamento', title: 'Agendamentos', icon: 'schedule', class: '', type: 'item' },
    { path: '/typography', title: 'Documentos', icon: 'library_books', class: '', type: 'item' },
    { path: '/customizar', title: 'Configurações', icon: 'bubble_chart', class: '', type: 'item' },
    { path: '/notifications', title: 'Notificações', icon: 'notifications', class: '', type: 'item' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    menus = ROUTES;
    selectedItem;

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    theme$: Observable<any>;
    onDestroy$ = new Subject<any>();

    constructor(
        private _customizeService: CustomizeService,
        private _changeDetectorRef: ChangeDetectorRef, 
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