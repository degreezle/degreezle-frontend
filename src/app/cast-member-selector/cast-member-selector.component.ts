import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CastMember } from '../../models';
import { PuzzleService } from '../services/puzzle-service.service';


@Component({
  selector: 'app-cast-member-selector',
  templateUrl: './cast-member-selector.component.html',
  styleUrls: ['./cast-member-selector.component.scss']
})
export class CastMemberSelectorComponent implements OnChanges {

  @Output() chosen: EventEmitter<number> = new EventEmitter<number>();
  @Input() movieId: number | undefined = undefined;

  clicks = 0;

  myControl = new FormControl('');

  options: CastMember[] = [];
  filteredOptions: Observable<CastMember[]> | undefined;

  @ViewChild('input') inputField: ElementRef | undefined;

  constructor(public puzzleService: PuzzleService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.myControl.valueChanges.subscribe(v => { if (this.hasChosen()) this.chosen.emit(this.myControl.value.id); });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.movieId && this.movieId) {
      this.options = await this.puzzleService.getMovieCrew(this.movieId).toPromise();
      this.myControl.setValue('');
    }
  }

  clicked() {
    this.clicks += 1;
    if (this.clicks == 1) {
      this.inputField?.nativeElement.blur();
    }
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
