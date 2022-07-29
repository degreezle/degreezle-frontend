import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  @Input() shouldOpenOnInit: boolean = true;

  dontOpenKeyboard = true;
  isMobileView = false;

  myControl = new FormControl('');

  options: CastMember[] = [];
  filteredOptions: Observable<CastMember[]> | undefined;

  @ViewChild('input') inputField: ElementRef | undefined;

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

  ngAfterViewInit() {
    if (this.shouldOpenOnInit && !this.isMobileView) {
      this.inputField?.nativeElement.focus();
      this.cdref.detectChanges();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.movieId && this.movieId) {
      this.options = await this.puzzleService.getMovieCrew(this.movieId).toPromise();
      this.myControl.setValue('');
    }
  }

  clicked() {
    if (this.dontOpenKeyboard && this.isMobileView) {
      this.inputField?.nativeElement.blur();
      this.dontOpenKeyboard = false;
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
