import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  filteredData: Content[] = [];
  public icon: string = '../../../assets/icon-category-movie.svg';

  constructor(public dataService: DataService, private bookmarkService: BookmarkService) { }


  ngOnInit(): void {
    this.dataService.filteredDataSubject.subscribe(data => {
      this.filteredData = data;
    });
    console.log(this.filteredData);
  }

  public addToBookmarks(movie: Content) {
    if (movie.isBookmarked) {
      // Remove the movie from bookmarks
      this.bookmarkService.removeBookmark(movie);
    } else {
      // Add the movie to bookmarks
      this.bookmarkService.addBookmark(movie);
    }
  }
}
