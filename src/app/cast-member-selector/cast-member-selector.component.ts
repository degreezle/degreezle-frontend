import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  typing = false;

  myControl = new FormControl('');

  options: CastMember[] = [];
  filteredOptions: Observable<CastMember[]> | undefined;

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
