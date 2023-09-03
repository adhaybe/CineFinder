import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../styles/search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchIcon: string = '../../../assets/icon-search.svg';

  searchControl = new FormControl();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value && value.trim() !== '') {
        this.dataService.fuzzySearch(value);
        this.dataService.isSearching = true;
      } else {
        this.dataService.filteredDataSubject.next([]); // Clear previous results
        this.dataService.isSearching = false;
      }
    });
  }
}
