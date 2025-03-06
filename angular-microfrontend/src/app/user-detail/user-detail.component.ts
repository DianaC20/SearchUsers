import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<any> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username']; 
      this.loadUser(username);
    });
  }

  private loadUser(username: string) {
    this.user$ = this.http.get(`https://api.github.com/users/${username}`).pipe(
      map((user: any) => {
        console.log('User data:', user);
        return {
          ...user,
          followersText: user.followers > 0 ? `${user.followers} seguidores` : 'Sin seguidores',
        };
      }),
      catchError((error) => {
        console.error('Error al cargar el usuario:', error);
        return of(null); 
      })
    );
  }

  viewFollowers(username: string) {
    this.router.navigate(['/followers', username]);
  }
  goBack() {
    window.location.href = 'http://localhost:3001/';
  }
  
}