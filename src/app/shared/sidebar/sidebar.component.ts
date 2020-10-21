import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombreUsuario: string;
  userSubs: Subscription;  

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe(({ user }) => { 
      this.nombreUsuario = user.nombre
    });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });

  }

}
