import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

import { trackByRoute } from '../../../shared/utils/track-by';


export const ROUTES: any[] = [
    { route: '/auth/admin', label: 'Administrador', icon: 'person', type: 'dropdown', children: [{ route: '/auth/dashboard', label: 'Dashboard', icon: 'dashboard', type: 'link' }] },
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

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private navigationService: NavigationService,
        private _media: MediaMatcher,
        private _router: Router
        ) {
        this.mobileQuery = _media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void { }

    openUserOptions(menu): void{
        menu.openMenu();
    }

    logout(): void {
        localStorage.clear();
        this._router.navigate(['/login']);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}