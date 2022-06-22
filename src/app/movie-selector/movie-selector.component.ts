import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Movie } from '../../models';


@Component({
  selector: 'app-movie-selector',
  templateUrl: './movie-selector.component.html',
  styleUrls: ['./movie-selector.component.scss']
})
export class MovieSelectorComponent implements OnInit {

  @Output() chosen: EventEmitter<boolean> = new EventEmitter<boolean>();

  typing = false;

  myControl = new FormControl(null);

  @Input() options: Movie[] = [];
  filteredOptions: Observable<Movie[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.myControl.valueChanges.subscribe(v => { if (this.hasChosen()) this.chosen.emit(); });
  }

  private _filter(value: string): Movie[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  hasChosen() {
    return this.myControl.value && typeof this.myControl.value !== 'string' && 'title' in this.myControl.value;
  }

  displayFn(option: Movie): string {
    return option && option.title ? option.title : '';
  }
}
