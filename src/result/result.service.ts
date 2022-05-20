import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';


// import { qna } from './result.entity';
// import { AddResQuestionDto } from './dto/addResQuestions.dto';


@Injectable()
export class ResultService {
  constructor(private httpService: HttpService) { }

  // getResult(id: string): Observable<AxiosResponse<string>> {
  async getResult(id: string): Promise<any[]> {
    const url = 'https://script.google.com/macros/s/AKfycbyABnXazg7oPI3IqfeT9WJmJuYCkOABVbxNlJexS5jWGrPJ3C13WaaHbmjbTGpyJ54jdg/exec?id=' + id
    // let res = this.httpService.get("34.125.14.233:3001/res-question/getlist?localeCode=vi_VN")
    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log("data", url, typeof data);
    let dataString = data.toString();
    let pos1 = dataString.indexOf("<table")
    let pos2 = dataString.indexOf("</table>")
    console.log('pos1', pos1, pos2);
    let tableDataString = dataString.slice(pos1, pos2)

    let endTr = tableDataString.indexOf("</tr>")
    let tableRows = tableDataString.slice(tableDataString.indexOf("<tr"), endTr)
    console.log("tableRows", tableRows);
    let column = []

    let posTh = tableRows.indexOf('<th')
    while (posTh > 0) {
      let endRow = tableRows.indexOf('</th>')
      let thTag = tableRows.slice(posTh, endRow)
      let row = thTag.slice(thTag.indexOf('>') + 1, thTag.indexOf('</th>'))

      tableRows = tableRows.slice(endRow + 5)

      // console.log(row, "tableRowstableRowstableRows", tableRows);
      column.push(row)
      posTh = tableRows.indexOf('<th')
    }

    console.log("column", column);

    let valueRows = tableDataString.slice(endTr + 5)
    console.log("valueRows", valueRows);
    let valueData = []

    let posTd = valueRows.indexOf('<td')
    while (posTd > 0) {
      let endRow = valueRows.indexOf('</td>')
      let tdTag = valueRows.slice(posTd, endRow)
      let row = tdTag.slice(tdTag.indexOf('>') + 1, tdTag.indexOf('</td>'))

      valueRows = valueRows.slice(endRow + 5)

      // console.log(row, "valueRows", valueRows);
      valueData.push(row)
      posTd = valueRows.indexOf('<td')
    }

    let res = []

    for (let i = 0; i < column.length; i++) {
      let row = column[i] ?? ""
      let value = valueData[i] ?? ""
      res.push({row, value})
    }

    return res
  }

}
