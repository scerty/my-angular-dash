import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { ProgressHelperService } from './progress-helper.service';
import { ProgressStepComponent } from './progress-step/progress-step.component';
import { Status, UiHelper } from './uiHelper';
import { trigger, state, style, animate, transition ,keyframes} from '@angular/animations';
import { AnimationBuilder, AnimationFactory, AnimationPlayer,  } from '@angular/animations';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  animations: [
    trigger('widthChange', [
      state('initial', style({ width: '0%' })),
      state('final', style('*')),
      transition('initial <=> final', animate('300ms', keyframes([
        style({ width: '0%', offset: 0 }),
        style({ width: '{{ width }}', offset: 1 }),
      ]))),
    ]),
  ],
})
export class ProgressComponent
  extends UiHelper
  implements OnInit, AfterContentInit {
    itemLength =1;
    corentStep=1;
    animationState = 'initial';
   
    widthValue = '0%';
  
    @Input() public set selectedIndex(value: number) { // Add ': number' as the parameter type
      this.activeIndex = value || 0;
    }

    @Output() public stateChange = new EventEmitter<{
      activeIndex: number;
      activeStep: ProgressStepComponent;
    }>();

  @ContentChildren(ProgressStepComponent) public steps: QueryList<
    ProgressStepComponent
  > | undefined;

  constructor(protected override progressHelper: ProgressHelperService,
    ) {
    super(progressHelper);
  }


  ngOnInit(): void {
    this.progressHelper.eventHelper.subscribe({
      next: ({ prev, next }) => {
        if (next) {
          this.next();
        }

        if (prev) {
          this.prev();
        }
      },
    });
  }

  ngAfterContentInit() {
    this.initProgress(this.progressSteps.length);
    this.setActiveActiveStep(this.activeIndex);
    this.initStepIndex();
  }

  public next() {
    this.increaseStep();
    this.corentStep++;
    if (this.corentStep>this.itemLength) {
      
      this.corentStep=this.itemLength+1
    };
    this.animationState = 'initial';
    this.widthValue = (100 / this.itemLength) * (this.corentStep - 1) + '%';
    setTimeout(() => {
      this.animationState = 'final';
    }, 50); // Add a small delay to reset the animation trigger

  }

  public prev() {
    this.decreaseStep();
    this.corentStep--;
    if (this.corentStep<1) {
      
      this.corentStep=1
    }
  }

  private increaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status !== Status.COMPLETED
    ) {
      this.completeLastStep();
    }

    if (this.activeIndex < this.itemLength - 1) {
      this.activeIndex++;
      this.switchStatusNext(this.activeIndex);
      this.setActiveActiveStep(this.activeIndex);
      this.emitStateChange();
    }
  }

  private decreaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status === Status.COMPLETED
    ) {
      this.undoLastComplete();
    } else {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.switchStatusPrev(this.activeIndex);
        this.setActiveActiveStep(this.activeIndex);
        this.emitStateChange();
      }
    }
  }

  private emitStateChange(): void {
    this.stateChange.emit({
      activeIndex: this.activeIndex,
      activeStep: this.activeStep,
    });
  }

  private setActiveActiveStep(index: number): void {
    if (this.stepsExists) {
      this.removeActiveStep();
      this.updateActiveStep(index);
    }
  }

  private updateActiveStep(index: number) {
    this.progressSteps[index].activeState = this.progressSteps[index];
  }

  private removeActiveStep() {
    this.progressSteps.map((step) => {
      if (step.isActive) {
        step.isActive = false;
      }
    });
  }

  private initStepIndex() {
    this.progressSteps.forEach((step, i) => (step.stepIndex = i));
  }

  public get activeStep(): ProgressStepComponent {
    return this.progressSteps[this.activeIndex];
  }

  private get stepsExists(): boolean {
    return this.progressSteps && Array.isArray(this.progressSteps);
  }

  private get progressSteps(): ProgressStepComponent[] {
    return this.steps!.toArray();
  }

  protected generateProgressArray(length: number): any[] {
    return [...Array(length).keys()].map((key) => {
      return {
        stepIndex: key,
        status: key === this.activeIndex ? Status.IN_PROGRESS : Status.PENDING,
      };
    });
  }

  private initProgress(value: number): void {
    this.itemLength = value || 0;
    this.itemProgressList = this.generateProgressArray(this.itemLength);
  }
}
