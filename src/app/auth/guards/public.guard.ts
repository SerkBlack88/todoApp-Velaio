import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap, pipe, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    console.log('hello');
    return authService.checkAuthentication()
        .pipe(
            tap((isAuthenticated) => {
                console.log('isAuthenticated', isAuthenticated);
                if (isAuthenticated) {
                router.navigate(['./']);
                }
                
            }),
            map((isAuthenticated) => !isAuthenticated)
        );
  };

export const canActivateLoginGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    console.log('CanActivate');
    console.log({ route, state });
   
    return checkAuthStatus();
  };

  export const canMatchLoginGuard: CanMatchFn = ( //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
  ) => {
    console.log('CanMatchooooo');
    console.log({ route, segments });

    return checkAuthStatus();
};