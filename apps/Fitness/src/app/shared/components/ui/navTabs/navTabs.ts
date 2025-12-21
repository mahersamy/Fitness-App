import { Component, computed, input, linkedSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { Skeleton } from "primeng/skeleton";
import { MuscleGroup } from '../../../models/muscles';
import { navItem } from '../../../models/navItem';


@Component({
  selector: 'app-nav-tabs',
  imports: [Skeleton],
  templateUrl: './navTabs.html',
  styleUrl: './navTabs.scss',
})
export class NavTabs implements OnInit {
  navItems = input.required<navItem[]>();
  navItemClick: OutputEmitterRef<navItem> = output();
  makeArr(l: number) {
    return Array.from({ length: l });
  }

  itemClickEmit(e: PointerEvent, item: navItem) {
    e.preventDefault();
    this.navItemClick.emit(item);
  }
  ngOnInit(){
    console.log(this.navItems());
  }
}
