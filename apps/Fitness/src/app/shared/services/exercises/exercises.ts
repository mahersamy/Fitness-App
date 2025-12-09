import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {EndPoint} from "../../../core/enums/endpoint";
import {ExercisesResponse} from "../../models/exercises";

@Injectable({
    providedIn: "root",
})
export class Exercises {
    private readonly _httpClient = inject(HttpClient);

    getExercisesByMuscle(muscle_id: string, level_id: string): Observable<ExercisesResponse> {
        return this._httpClient.get<ExercisesResponse>(
            `${EndPoint.EXERCISES_BY_MUSCLE_DIFFICULTY}?primeMoverMuscleId=${muscle_id}&difficultyLevelId=${level_id}`
        );
    }
}
