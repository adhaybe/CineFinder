import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/Content';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data: Content[] = [];
  public filteredDataSubject: BehaviorSubject<Content[]> = new BehaviorSubject<Content[]>([]);
  public isSearching: boolean = false;
  public lastSearchedTerm: string = '';


  constructor(private http: HttpClient) {
    this.getData().subscribe((data) => {
      this.data = data;
    });
  }

  getData(): Observable<Content[]> {
    return this.http.get<Content[]>('../../assets/data.json');
  }

  fuzzySearch(query: string): void {
    const searchTerm = query.toLowerCase();
    this.lastSearchedTerm = searchTerm;
    const results = this.data.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm)
    );
    this.filteredDataSubject.next(results);
  }
    

}
