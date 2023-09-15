import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiMarvelService } from 'src/app/service/api-marvel.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public detailsCharacters: any[];
  public detailsEvents: any[];
  public detailsSeries: any[];

  constructor(private apiMarvelService: ApiMarvelService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.apiMarvelService.getCharacterDetails(id).subscribe(res => {
      this.detailsCharacters = res.data.results
      this.detailsEvents = this.detailsCharacters[0].events.items
      this.detailsSeries = this.detailsCharacters[0].series.items
    });

  }


}
