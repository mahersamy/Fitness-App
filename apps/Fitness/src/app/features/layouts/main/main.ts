import {Component} from "@angular/core";
import {Navbar} from "./components/navbar/navbar";
import {Footer} from "./components/footer/footer";
import {RouterModule} from "@angular/router";
import {ButtonTheme} from "@fitness-app/buttons";

@Component({
    selector: "app-main",
    imports: [Navbar, Footer, RouterModule, ButtonTheme],
    templateUrl: "./main.html",
    styleUrl: "./main.scss",
})
export class Main {}
