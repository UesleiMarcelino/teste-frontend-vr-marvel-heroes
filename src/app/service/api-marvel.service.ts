import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMarvelService {
  limit = 100
  publicKey = '35852b715a21d1f6fb70c8cba6bec76a';
  hash = '7fda7630da0d926d2b0630548b81ab02';
  urlApi = `https://gateway.marvel.com:443/v1/public/characters?orderBy=-modified&limit=${this.limit}&ts=1&apikey=${this.publicKey}&hash=${this.hash}`;

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get<any>(this.urlApi).pipe(map((data: any) => data.data.results))
  }

  getCharacterDetails(id: number): Observable<any> {
    const urlCharacterApi = `https://gateway.marvel.com:443/v1/public/characters/${id}?&ts=1&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(urlCharacterApi).pipe(
      tap((res: any) => {
        res.data.results[0].events.items.map((resEvents: any) => {
          this.getEvents(resEvents.resourceURI).subscribe(res => resEvents.status = res)
        })
        res.data.results[0].series.items.map((resSeries: any) => {
          this.getEvents(resSeries.resourceURI).subscribe(res => resSeries.status = res)
        })
      }
      )
    )

  }

  public getEvents(url: string): Observable<any> {
    return this.http.get<any>(`${url}?&ts=1&apikey=${this.publicKey}&hash=${this.hash}`).pipe(
      map(
        (res: any) => res.data.results[0]
      )
    )
  }

}
