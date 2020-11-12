/*
import { Component, OnInit } from '@angular/core';
import { AccountService, MenuService } from '@lamis/web-core';
import { NbMenuItem } from '@nebular/theme';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
        <ngx-one-column-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-one-column-layout>
    `,
})
export class PagesComponent implements OnInit {
    menu: any;

    constructor(private menuService: MenuService, private accountService: AccountService) {
    }

    ngOnInit(): void {
        const menuItem: NbMenuItem[] = [];
        this.menuService.getMenus().subscribe(res => {
            res.forEach(o => {
                if (this.accountService.hasAnyAuthority(o.authorities)) {
                    const m: any = {};
                    m.title = o.name;
                    m['icon'] = o.icon;
                    m['link'] = (o.state ? '/' + o.state : '');
                    m['home'] = o.type == 'icon';
                    m['group'] = o.type == 'separator';
                    if (o.subs) {
                        m['children'] = [];
                        o.subs.forEach(s => {
                            if (this.accountService.hasAnyAuthority(s.authorities)) {
                                const m1: any = {};
                                m1.title = s.name;
                                m1['icon'] = s.icon;
                                m1['link'] = (o.state ? '/' + o.state : '') + '/' + s.state;
                                m1['home'] = s.type == 'icon';
                                m1['group'] = s.type == 'separator';
                                m['children'].push(m1);
                                if (s.subs) {
                                    m1['children'] = [];
                                    s.subs.forEach(t => {
                                        if (this.accountService.hasAnyAuthority(t.authorities)) {
                                            const m2: any = {};
                                            m2.title = t.name;
                                            m2['home'] = t.type == 'icon';
                                            m2['group'] = t.type == 'separator';
                                            m2['link'] = (o.state ? '/' + o.state : '') + '/' +
                                                (s.state ? '/' + s.state : '') + '/' + t.state;
                                            m2['group'] = t.type == 'icon';
                                            m1['children'].push(m2);
                                        }
                                    })
                                }
                            }
                        });
                    }
                    menuItem.push(m);
                }
            });
            this.menu = menuItem;
        });
    }
}
*/
