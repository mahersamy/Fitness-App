import {isPlatformBrowser, NgOptimizedImage} from "@angular/common";
import {
    Component,
    effect,
    inject,
    input,
    InputSignal,
    PLATFORM_ID,
    signal,
    WritableSignal,
} from "@angular/core";
import {Exercise} from "../../../../../models/exercises";
import {Meal, MealDetails} from "../../../../../models/meals";
import {MealService} from "../../../../../services/meals/meals";

@Component({
    selector: "app-media-container",
    imports: [NgOptimizedImage],
    templateUrl: "./media-container.html",
    styleUrl: "./media-container.scss",
})
export class MediaContainer {
    private readonly _mealService = inject(MealService);
    private readonly _PLATFORM_ID = inject(PLATFORM_ID);

    type = input.required<"meal" | "class">();
    selectedExercise: InputSignal<Exercise | undefined> = input<Exercise | undefined>(undefined);
    selectedMeal: InputSignal<Meal | undefined> = input<Meal | undefined>(undefined);

    mealDetails: WritableSignal<MealDetails | undefined> = signal(undefined);

    private levelsEffect = effect(() => {
        if (this.selectedMeal() !== undefined) {
            this.getMealDetails(this.selectedMeal()!.idMeal);
        }
    });

    getMealDetails(meal_id: string) {
        console.log(meal_id, "id");

        this._mealService.getMealDetails(meal_id).subscribe({
            next: (res) => {
                this.mealDetails.set(res.meals[0]);
                this._mealService.mealDetails.set(res.meals[0]);
            },
        });
    }

    openVideo() {
        if (!isPlatformBrowser(this._PLATFORM_ID)) return;
        if (this.type() === "class") {
            window.open(this.selectedExercise()?.in_depth_youtube_explanation_link);
        } else {
            window.open(this.mealDetails()!.strSource);
        }
    }
}
