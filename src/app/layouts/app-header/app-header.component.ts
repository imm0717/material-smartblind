import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  sideNavOpen: boolean = true

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/login'])

      }
    )
  }

  toggleSideNav(){
    this.sideNavOpen = !this.sideNavOpen
  }

}
