import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Selectable } from 'src/models';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent<T extends Selectable> implements OnInit {

  @Output() chosen: EventEmitter<boolean> = new EventEmitter<boolean>();

  typing = false;

  myControl = new FormControl(null);

  @Input() options: T[] = [];
  filteredOptions: Observable<T[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.myControl.valueChanges.subscribe(v => { if (this.hasChosen()) this.chosen.emit(); });
  }

  private _filter(value: string): T[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  hasChosen() {
    return this.myControl.value && typeof this.myControl.value !== 'string' && 'name' in this.myControl.value;
  }

  displayFn(option: T): string {
    return option && option.name ? option.name : '';
  }
}
