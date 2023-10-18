import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormulairesComponent } from '../formulaires/formulaires.component';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private readonly _Http : HttpClient
  ) { }

  // async getCities(filter: string): Promise<string[]> {

  //   const maxRows = 5;

  //   const response = await firstValueFrom(
  //     this._Http.get<any[]>(
  //       `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${filter}&maxRows=${maxRows}`
  //     )
  //   );
  //   const cities = response.map((item: any) => item.placeName);

  //   return cities;
  // }

}
