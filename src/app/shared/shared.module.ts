import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ListHeroesComponent } from './list-heroes/list-heroes.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    ListHeroesComponent,
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    ListHeroesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
