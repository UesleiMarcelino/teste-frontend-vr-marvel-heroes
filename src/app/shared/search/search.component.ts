import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() public emmitSearched: any = new EventEmitter();

  ngOnInit(): void {
 
  }

  public searchCharacter(value: string){
    this.emmitSearched.emit(value);
  }
}

