import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Movie } from '../../models';
import { PuzzleService } from '../services/puzzle-service.service';


@Component({
  selector: 'app-movie-selector',
  templateUrl: './movie-selector.component.html',
  styleUrls: ['./movie-selector.component.scss']
})
export class MovieSelectorComponent implements OnChanges {

  @Output() chosen: EventEmitter<number> = new EventEmitter<number>();
  @Input() castMemberId: number | undefined = undefined;
  @Input() shouldOpenOnInit: boolean = true;

  dontOpenKeyboard = true;
  isMobileView = false;
  @ViewChild('input') inputField: ElementRef | undefined;

  myControl = new FormControl('');

  options: Movie[] = [];
  filteredOptions: Observable<Movie[]> | undefined;

  constructor(public puzzleService: PuzzleService, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.myControl.valueChanges.subscribe(v => { if (this.hasChosen()) this.chosen.emit(this.myControl.value.id); });
    this.isMobileView = window.innerWidth <= 600;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = window.innerWidth <= 600;
  }

  // ngAfterViewInit() {
  //   if (this.shouldOpenOnInit && !this.isMobileView) {
  //     this.inputField?.nativeElement.focus();
  //     this.cdref.detectChanges();
  //   }
  // }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.castMemberId && this.castMemberId) {
      this.options = await this.puzzleService.getPersonFilmography(this.castMemberId).toPromise();
      this.myControl.setValue('');
    }
  }

  clicked() {
    if (this.dontOpenKeyboard && this.isMobileView) {
      this.inputField?.nativeElement.blur();
      this.dontOpenKeyboard = false;
    }
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
