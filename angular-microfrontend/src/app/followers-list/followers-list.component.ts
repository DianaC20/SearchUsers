import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-followers-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css'],
})
export class FollowersListComponent implements OnInit {
  followers$: Observable<any> = new Observable();
  username: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    if (this.username) {
      this.followers$ = this.http.get(`https://api.github.com/users/${this.username}/followers`);
    }
  }
  goBack() {
    window.location.href = 'http://localhost:3001/';
  }
}