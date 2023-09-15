import { Component, OnInit } from '@angular/core';
import { EventsModel } from 'src/app/model/events-marvel/events-model';
import { SeriesModel } from 'src/app/model/series/series-model';
import { ApiMarvelService } from 'src/app/service/api-marvel.service';

@Component({
  selector: 'list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.scss']
})
export class ListHeroesComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10
  public isLoading = false

  public allCharacters: any[] = [];
  public setAllCharacters: string[] = [];
  public searchAllCharacters: any;
  public series = new SeriesModel();
  public events = new EventsModel();

  constructor(private apiMarvelService: ApiMarvelService) {

  }
  ngOnInit(): void {
    this.renderTableData()
  }

  renderTableData() {
    this.isLoading = true
    this.apiMarvelService.getAllCharacters().subscribe(res => {
      this.setAllCharacters = res


      this.setAllCharacters.forEach((res: any) => {
        let data = {
          nameCharacter: res.name,
          id: res.id,
          thumbnail: `${res.thumbnail.path + '.' + res.thumbnail.extension}`,
          series: res.series.items.map((elem: any) => elem.name).slice(0, 3),
          events: res.events.items.map((elem: any) => elem.name).slice(0, 3)
        }
        this.allCharacters.push(data);
        this.searchAllCharacters = this.allCharacters
      });

      if (this.allCharacters) {
        this.isLoading = false
      }
    })
  }

  public search(value: string) {
    const filter = this.searchAllCharacters.filter((res: any) => {
      let aux = res.nameCharacter.toLowerCase()
      return !aux.indexOf(value.toLowerCase());
    })
    this.allCharacters = filter
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.renderTableData();
  }
}
