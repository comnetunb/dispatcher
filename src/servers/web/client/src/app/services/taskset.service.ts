import { Injectable } from '@angular/core';
import { ObservableSearchService, SearchService } from 'lacuna-mat-table';
import { Subject, Observable } from 'rxjs';
import { ILog } from '../../../../../../database/models/log';
import { constructor } from 'range-parser';
import { ITaskSet } from '../../../../../../database/models/taskSet';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OperationState } from '../../../../../../api/enums';
import { ITask } from '../../../../../../database/models/task';
import { CreateTasksetRequest } from '../api/create-taskset-request';

const apiRoute = '/api/tasksets';

@Injectable({
  providedIn: 'root'
})
export class TasksetService implements ObservableSearchService {
  private changedSubject: Subject<any> = new Subject<any>();

  changed: Observable<string> = this.changedSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  dataSource(state?: OperationState): SearchService<ITaskSet> {
    let params = {};

    if (state != null) {
      params = { state };
    }

    return {
      list: (): Observable<ITaskSet[]> => {
        return this.http.get<ITaskSet[]>(`${apiRoute}`, { params });
      }
    }
  }

  create(request: CreateTasksetRequest): Observable<ITaskSet> {
    return this.http.post<ITaskSet>(`${apiRoute}`, request);
  }

  get(tasksetId: string): Observable<ITaskSet> {
    return this.http.get<ITaskSet>(`${apiRoute}/${tasksetId}`);
  }

  delete(tasksetId: string): Observable<void> {
    return this.http.delete<void>(`${apiRoute}/${tasksetId}`, { responseType: 'text' as 'json' });
  }

  cancel(tasksetId: string): Observable<ITaskSet> {
    return this.http.post<ITaskSet>(`${apiRoute}/${tasksetId}/cancel`, null);
  }

}
