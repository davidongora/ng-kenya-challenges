import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  subscription: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscription = this.dataService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}