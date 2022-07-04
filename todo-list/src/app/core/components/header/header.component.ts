import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.userLoggedIn.subscribe( value => {
      this.isLoggedIn = value;
    });
  }

  logout() {
    this.authService.logout();
  }

}
