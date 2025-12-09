import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {EndPoint} from "../../../core/enums/endpoint";
import {LevelsResponse} from "../../models/levels";

@Injectable({
    providedIn: "root",
})
export class Levels {
    private readonly _httpClient = inject(HttpClient);

    getLevelsByMuscle(id: string): Observable<LevelsResponse> {
        return this._httpClient.get<LevelsResponse>(
            `${EndPoint.LEVELS_BY_MUSCLE}?primeMoverMuscleId=${id}`
        );
    }
}
