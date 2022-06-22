import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CastMember } from '../../models';


@Component({
  selector: 'app-cast-member-selector',
  templateUrl: './cast-member-selector.component.html',
  styleUrls: ['./cast-member-selector.component.scss']
})
export class CastMemberSelectorComponent implements OnInit {

  @Output() chosen: EventEmitter<boolean> = new EventEmitter<boolean>();

  typing = false;

  myControl = new FormControl(null);

  @Input() options: CastMember[] = [];
  filteredOptions: Observable<CastMember[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.myControl.valueChanges.subscribe(v => { if (this.hasChosen()) this.chosen.emit(); });
  }

  private _filter(value: string): CastMember[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  hasChosen() {
    return this.myControl.value && typeof this.myControl.value !== 'string' && 'name' in this.myControl.value;
  }

  displayFn(option: CastMember): string {
    return option && option.name ? option.name : '';
  }
}
