import {Component, DestroyRef, inject, signal} from "@angular/core";
// Forms
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
// i18n
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
// Shared-components
import {FitnessInput} from "@fitness-app/fitness-form";
import {AuthApiKpService} from "auth-api-kp";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: "app-login",
    imports: [ReactiveFormsModule, FitnessInput, TranslatePipe],
    templateUrl: "./login.html",
    styleUrl: "./login.scss",
})
export class Login {
    // Denpendency Injection
    private readonly formBuilder = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);
    private readonly _authApiKpService = inject(AuthApiKpService);
    private readonly _router = inject(Router);
    public _messageService = inject(MessageService);
    private readonly _translate = inject(TranslateService);

    isLoading = signal<boolean>(false);

    loginForm: FormGroup = this.formBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        password: [
            "",
            [
                Validators.required,
                Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&\\)]).{8,}$"),
            ],
        ],
    });

    submit() {
        if (this.loginForm.valid) {
            console.log("Form Data:", this.loginForm.value);
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    LoginSubmit(): void {
        if (this.loginForm.invalid || this.isLoading()) return;

        this.isLoading.set(true);
        this._authApiKpService
            .login(this.loginForm.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    console.log(res);
                    if( res.error){
                      console.log(res.error);
                        this._messageService.add({
                            severity: "success",
                            detail: this._translate.instant("messagesToast.loginSuccess"),
                            life: 3000,
                        });
                        this._router.navigate(["/"]);
                    }else{
                        this._messageService.add({
                            severity: "error",
                            detail: this._translate.instant("messagesToast.loginFailed"),
                            life: 5000,
                        });
                    }

                },
                error: () => {
                    this._messageService.add({
                        severity: "error",
                        detail: this._translate.instant("messagesToast.loginFailed"),
                        life: 5000,
                    });
                },
                complete: () => {
                    this.isLoading.set(false);
                },
            });
    }
}
