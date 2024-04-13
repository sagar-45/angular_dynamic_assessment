import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, elements } from 'chart.js';
import { filter } from 'rxjs';
import { EditService } from 'src/app/service/edit.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  assessmentForm!: FormGroup;
  body_parts: string[] = [
    'Hip',
    'Knee',
    'Hand',
    'Leg',
    'Foot',
    'Upper arm',
    'ankle and foot',
  ];
  selectSettings = {};
  submitted: boolean = false;
  currentCategoryIndex: number = 0;
  currentAssessmentIndex: number = 0;
  measurementWithoutComparison: string[] = ['Simple', 'Error rate'];
  measurementWithComparison: string[] = [
    'Simple',
    'Error rate',
    'Difference',
    'Comparison',
  ];
  measurementSettings = {
    enableCheckAll: false,
  };
  routines: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  routineSetting = {
    selectAllText: 'Daily',
    unSelectAllText: 'Daily',
  };

  timeSettings = {
    enableCheckAll: false,
  };

  assessmentTypes = [
    'Length dimension',
    'Quantity',
    'Temperature',
    'Angular Dimension',
  ];
  lengthUnits = ['Millimeter', 'Centimeter', 'Meter', 'Kilometer'];
  quantityUnits = ['number'];
  temperatureUnits = ['Degree(C°)'];
  angularUnits = ['Degree'];
  showDetails: boolean = false;
  showGreaterNumberError: boolean = false;
  goalsOptions = [
    'Equal to',
    'Not Equal to',
    'Greater than',
    'Greater than or equal to',
    'Less than',
    'Less than or equal to',
    'In between',
    'Not in between',
  ];
  showErrorOfGoal: boolean = false;
  chartShow: boolean = false;
  units: string[] = [];
  LineChart: any = [];
  error: string = '';
  edit: boolean = false;
  data: any;
  userIconShow: boolean = true;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private router: Router,
    private editService: EditService
  ) {}

  ngOnInit(): void {
    this.initializedForm();
    if (this.router.url == '/addCategory') {
      this.addMeasurement();
    }
    this.getMeasurements;

    if (this.router.url == '/editCategory') {
      let data = this.editService.getEditData();
      if (!data) {
        this.router.navigateByUrl('');
        return;
      }
      this.edit = true;
      this.data = data;
      this.assessmentForm.get('assessmentName')?.disable();
      this.assessmentForm.patchValue({
        assessmentName: data.assessmentName,
        body_region: data.body_region,
        description: data.description,
      });
      this.patchMeasurements(data.measurements);
      this.patchCategories(data.categories);
      this.getUnits();
      this.currentCategoryIndex = 0;
      this.currentAssessmentIndex = 0;
      this.showDetails = true;
    }
  }

  initializedForm() {
    this.assessmentForm = this.fb.group({
      assessmentName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]+$/)],
      ],
      body_region: ['', [Validators.required]],
      description: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      measurements: this.fb.array([]),
      categories: this.fb.array([]),
    });
  }

  patchMeasurements(measurements: any) {
    const control = <FormArray>this.assessmentForm.get('measurements');
    measurements.forEach((element: any) => {
      control.push(this.newMeasurement(element.name, element.time));
    });
  }

  patchCategories(categories: any) {
    const control = <FormArray>this.assessmentForm.get('categories');
    categories.forEach((element: any) => {
      control.push(
        this.newCategory(
          element.categorySlider,
          element.categoryName,
          element.assessment
        )
      );
    });
  }

  patchAssessments(control: any, assessment: any) {
    assessment.forEach((element: any) => {
      control.push(
        this.newAssessment(
          element.assessmentSlider,
          element.assessmentName,
          element.assessmentDetails
        )
      );
    });
  }

  get measurements() {
    return this.assessmentForm.get('measurements') as FormArray;
  }

  get categories() {
    return this.assessmentForm.get('categories') as FormArray;
  }

  newMeasurement(name = '', time = ''): FormGroup {
    return this.fb.group({
      name: [
        name,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      time: [time, [Validators.required]],
    });
  }

  newCategory(slider = true, name = '', assessment?: any): FormGroup {
    let group = this.fb.group({
      categorySlider: [slider, Validators.required],
      categoryName: [
        name,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      assessment: this.fb.array([]),
    });
    if (assessment) {
      this.patchAssessments(group.get('assessment'), assessment);
    }
    return group;
  }

  newAssessment(slider = true, name = '', assessmentDetails?: any): FormGroup {
    if (assessmentDetails) {
      return this.fb.group({
        userIconShow: [assessmentDetails.patientAssessment],
        assessmentSlider: [slider, [Validators.required]],
        assessmentName: [
          name,
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
        ],
        assessmentDetails: this.fb.group({
          assessmentType: [
            assessmentDetails.assessmentType,
            [Validators.required],
          ],
          patientAssessment: [
            assessmentDetails.patientAssessment,
            [Validators.required],
          ],
          unit: [assessmentDetails.unit, [Validators.required]],
          rangeStart: [
            assessmentDetails.rangeStart,
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          rangeEnd: [
            assessmentDetails.rangeEnd,
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          measurementType: [
            assessmentDetails.measurementType,
            [Validators.required],
          ],
          measuringRegion: [
            assessmentDetails.measuringRegion,
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          referenceRegion: [assessmentDetails.referenceRegion],
          measurementsType: [assessmentDetails.measurementsType],
          goalsSimpleType: [
            assessmentDetails.goalsSimpleType,
            [Validators.required],
          ],
          goalsSimpleValue: [
            assessmentDetails.goalsSimpleValue,
            [Validators.required],
          ],
          goalsErrorType: [assessmentDetails.goalsErrorType],
          goalsErrorValue: [assessmentDetails.goalsErrorValue],
          goalsDifferenceType: [assessmentDetails.goalsDifferenceType],
          goalsDifferenceValue: [assessmentDetails.goalsDifferenceValue],
          goalsComparisonType: [assessmentDetails.goalsComparisonType],
          goalsComparisonValue: [assessmentDetails.goalsComparisonValue],
          description: [
            assessmentDetails.description,
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          routine: [assessmentDetails.routine, [Validators.required]],
          times: [assessmentDetails.times, [Validators.required]],
        }),
      });
    } else {
      return this.fb.group({
        userIconShow: [true],
        assessmentSlider: [slider, [Validators.required]],
        assessmentName: [
          name,
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
        ],
        assessmentDetails: this.fb.group({
          assessmentType: ['', [Validators.required]],
          patientAssessment: [true, [Validators.required]],
          unit: ['', [Validators.required]],
          rangeStart: [
            '',
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          rangeEnd: [
            '',
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          measurementType: [false, [Validators.required]],
          measuringRegion: [
            '',
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          referenceRegion: [''],
          measurementsType: [['Simple']],
          goalsSimpleType: ['Equal to', [Validators.required]],
          goalsSimpleValue: ['', [Validators.required]],
          goalsErrorType: ['Equal to'],
          goalsErrorValue: [''],
          goalsDifferenceType: ['Equal to'],
          goalsDifferenceValue: [''],
          goalsComparisonType: ['Equal to'],
          goalsComparisonValue: [''],
          description: [
            '',
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
          ],
          routine: ['', [Validators.required]],
          times: ['', [Validators.required]],
        }),
      });
    }
  }

  addMeasurement() {
    this.measurements.push(this.newMeasurement());
  }

  removeMeasurement(index: number) {
    this.measurements.removeAt(index);
  }

  addCategory() {
    if (this.assessmentForm.get('categories')?.valid) {
      if (this.assessmentForm.get('categories')?.value.length == 0) {
        this.categories.push(this.newCategory());
      } else {
        let categories = this.assessmentForm.get('categories')?.value;
        categories.forEach((element: any, index: number) => {
          if (element.assessment.length > 0) {
            if (index == categories.length - 1) {
              this.categories.push(this.newCategory());
            }
          }
        });
      }
    }
  }

  removeCategory(index: number) {
    this.showDetails = false;
    if (this.currentCategoryIndex >= index) {
      if (this.currentCategoryIndex !== 0) {
        this.currentCategoryIndex = this.currentCategoryIndex - 1;
      }
      this.currentAssessmentIndex = 0;
    }
    this.categories.removeAt(index);
  }

  addAssessment(i: number, event: string) {
    if (event == 'blur') {
      if (this.assessmentForm.get('categories')?.valid) {
        let assessment = this.getAssessment(i);
        assessment.push(this.newAssessment());
      }
    } else {
      if (this.getAssessment(i).valid) {
        let assessment = this.getAssessment(i);
        assessment.push(this.newAssessment());
      }
    }
    this.currentCategoryIndex = i;
  }

  removeAssessment(categoryIndex: number, assessmentIndex: number) {
    this.showDetails = false;
    this.getAssessment(categoryIndex).removeAt(assessmentIndex);
    if (this.currentAssessmentIndex >= assessmentIndex) {
      if (this.currentAssessmentIndex !== 0) {
        this.currentAssessmentIndex = this.currentAssessmentIndex - 1;
      }
    }
  }

  showAssessmentDetails(categoryIndex: number, assessmentIndex: number) {
    let assessmentDetails = this.getAssessment(categoryIndex).controls[
      assessmentIndex
    ] as FormGroup;
    if (assessmentDetails.controls['assessmentName'].valid) {
      this.currentCategoryIndex = categoryIndex;
      this.currentAssessmentIndex = assessmentIndex;
      this.showDetails = true;
    }
    this.getUnits();
  }

  submitAssessment() {
    this.submitted = true;
    if (this.assessmentForm.invalid) {
      this.error =
        'We still need information about Assessment template, Body region, Description, Patient measurements';
      this.closeError();
      return;
    } else if (this.assessmentForm.get('categories')?.value.length == 0) {
      this.error = 'We still need information about Category';
      this.closeError();
      return;
    } else if (this.assessmentForm.valid) {
      let categories = this.assessmentForm.get('categories')?.value;
      categories.forEach((element: any, index: number) => {
        if (element.assessment.length > 0) {
          if (index == categories.length - 1) {
            if (this.edit) {
              let editIndex = this.editService.getEditIndex();
              this.storeService.editData(
                this.data,
                this.assessmentForm.getRawValue(),
                editIndex
              );
              this.router.navigateByUrl('');
            } else {
              if (
                this.storeService.checkAssessment(this.assessmentForm.value)
              ) {
                this.error = 'Please Change Assessment name or body region';
                this.closeError();
              } else {
                this.router.navigateByUrl('');
                this.storeService.saveData(this.assessmentForm.value);
              }
            }
          }
        } else {
          this.error = 'Please add assessment in category';
          this.closeError();
        }
      });
    }
  }

  get getControls() {
    return this.assessmentForm.controls;
  }

  get getMeasurements() {
    return (this.getControls['measurements'] as FormArray)
      .controls as Array<FormGroup>;
  }

  get getCategory() {
    return this.categories.controls as Array<FormGroup>;
  }

  getAssessment(index: number) {
    return this.getCategory[index].controls['assessment'] as FormArray;
  }

  getAssessmentControl(categoryIndex: number, assessmentIndex: number) {
    return this.getAssessment(categoryIndex).controls[
      assessmentIndex
    ] as FormGroup;
  }
  getCategoryControl(i: number) {
    return this.getCategory[i] as FormGroup;
  }

  getAssessmentDetails() {
    return (
      this.getAssessment(this.currentCategoryIndex).controls[
        this.currentAssessmentIndex
      ] as FormGroup
    ).controls['assessmentDetails'] as FormGroup;
  }

  getKeys(object: {}) {
    return Object.keys(object)[0];
  }

  getUnits() {
    let type = this.getAssessmentDetails().controls['assessmentType'].value;
    if (type == 'Length dimension') {
      this.units = this.lengthUnits;
    } else if (type == 'Quantity') {
      this.units = this.quantityUnits;
    } else if (type == 'Temperature') {
      this.units = this.temperatureUnits;
    } else if (type == 'Angular Dimension') {
      this.units = this.angularUnits;
    }
    return this.units;
  }

  checkRangeValidation() {
    let start = this.getAssessmentDetails().controls['rangeStart'].value;
    let end = this.getAssessmentDetails().controls['rangeEnd'].value;
    if (start !== '' && end !== '') {
      if (Number(start) >= Number(end)) {
        this.showGreaterNumberError = true;
      } else {
        this.showGreaterNumberError = false;
      }
    }
  }

  getMeasurementsType(goal: string) {
    let measurementType =
      this.getAssessmentDetails().controls['measurementsType'].value;
    if (goal == 'Simple') {
      if (measurementType.indexOf('Simple') >= 0) {
        return true;
      }
      return false;
    } else if (goal == 'Error rate') {
      if (measurementType.indexOf('Error rate') >= 0) {
        return true;
      }
      return false;
    } else if (goal == 'Difference') {
      if (measurementType.indexOf('Difference') >= 0) {
        return true;
      }
      return false;
    } else {
      if (measurementType.indexOf('Comparison') >= 0) {
        return true;
      }
      return false;
    }
  }

  getTimes() {
    let data: any = [];
    this.assessmentForm.get('measurements')?.value.forEach((element: any) => {
      data.push(element.name);
    });
    return data;
  }

  isValueLessthan() {
    let start = Number(
      this.getAssessmentDetails().controls['rangeStart'].value
    );
    let errorValue = Number(
      this.getAssessmentDetails().controls['goalsSimpleValue'].value
    );
    if (errorValue < start) {
      this.showErrorOfGoal = true;
    } else {
      this.showErrorOfGoal = false;
    }
  }

  resetValue() {
    this.getAssessmentDetails().reset();
    this.getAssessmentDetails().patchValue({
      assessmentType: '',
      unit: '',
      patientAssessment: true,
      measurementType: false,
      measurementsType: ['Simple'],
      goalsSimpleType: 'Equal to',
      goalsErrorType: 'Equal to',
      routine: '',
      times: '',
    });
    this.submitted = false;
  }

  sideComparison(event: any) {
    if (event.checked) {
      this.getAssessmentDetails().controls['referenceRegion'].setValidators([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9-_]+$/),
      ]);
      this.getAssessmentDetails().patchValue({
        referenceRegion: '',
        measurementsType: ['Simple'],
      });
    } else {
      this.getAssessmentDetails().patchValue({
        referenceRegion: '',
        measurementsType: ['Simple'],
      });
      this.getAssessmentDetails().controls['referenceRegion'].clearValidators();
    }
  }

  public onItemSelect(item: any) {
    if (item == 'Simple') {
      this.getAssessmentDetails().controls['goalsSimpleType'].setValidators(
        Validators.required
      );
      this.getAssessmentDetails().controls['goalsSimpleValue'].setValidators(
        Validators.required
      );
      this.setValue('Simple');
    } else if (item == 'Error rate') {
      this.getAssessmentDetails().controls['goalsErrorType'].setValidators(
        Validators.required
      );
      this.getAssessmentDetails().controls['goalsErrorValue'].setValidators(
        Validators.required
      );
      this.setValue('Error rate');
    } else if (item == 'Difference') {
      this.getAssessmentDetails().controls['goalsDifferenceType'].setValidators(
        Validators.required
      );
      this.getAssessmentDetails().controls[
        'goalsDifferenceValue'
      ].setValidators(Validators.required);
      this.setValue('Difference');
    } else if (item == 'Comparison') {
      this.getAssessmentDetails().controls['goalsComparisonType'].setValidators(
        Validators.required
      );
      this.getAssessmentDetails().controls[
        'goalsComparisonValue'
      ].setValidators(Validators.required);
      this.setValue('Comparison');
    }
  }
  public onDeSelect(item: any) {
    if (item == 'Simple') {
      this.getAssessmentDetails().controls['goalsSimpleType'].clearValidators();
      this.getAssessmentDetails().controls[
        'goalsSimpleValue'
      ].clearValidators();
      this.setValue('Simple');
    } else if (item == 'Error rate') {
      this.getAssessmentDetails().controls['goalsErrorType'].clearValidators();
      this.getAssessmentDetails().controls['goalsErrorValue'].clearValidators();
      this.setValue('Error rate');
    } else if (item == 'Difference') {
      this.getAssessmentDetails().controls[
        'goalsDifferenceType'
      ].clearValidators();
      this.getAssessmentDetails().controls[
        'goalsDifferenceValue'
      ].clearValidators();
      this.setValue('Difference');
    } else if (item == 'Comparison') {
      this.getAssessmentDetails().controls[
        'goalsComparisonType'
      ].clearValidators();
      this.getAssessmentDetails().controls[
        'goalsComparisonValue'
      ].clearValidators();
      this.setValue('Comparison');
    }
  }

  setValue(item: string) {
    if (item == 'Simple') {
      this.getAssessmentDetails().patchValue({
        goalsSimpleType: 'Equal to',
        goalsSimpleValue: '',
      });
    } else if (item == 'Error rate') {
      this.getAssessmentDetails().patchValue({
        goalsErrorType: 'Equal to',
        goalsErrorValue: '',
      });
    } else if (item == 'Difference') {
      this.getAssessmentDetails().patchValue({
        goalsDifferenceType: 'Equal to',
        goalsDifferenceValue: '',
      });
    } else if (item == 'Comparison') {
      this.getAssessmentDetails().patchValue({
        goalsComparisonType: 'Equal to',
        goalsComparisonValue: '',
      });
    }
  }

  get getRoutine() {
    return this.getAssessmentDetails().controls['routine'] as FormControl;
  }

  get getTimesControl() {
    return this.getAssessmentDetails().controls['times'] as FormControl;
  }

  get getMeasurementsTypeControl() {
    return this.getAssessmentDetails().controls[
      'measurementsType'
    ] as FormControl;
  }

  closeError() {
    setTimeout(() => {
      this.error = '';
    }, 2000);
  }

  back() {
    this.router.navigateByUrl('');
  }

  changeCategorySilder(event: any, categoryIndex: number) {
    let assessment = (
      this.categories.at(categoryIndex).get('assessment') as FormArray
    )?.controls as Array<FormGroup>;
    if (assessment) {
      assessment.forEach((element) => {
        element.patchValue({
          assessmentSlider: event.checked,
        });
      });
    }
  }

  changeAssessmentSilder(event: any, categoryIndex: number) {
    if (event.checked) {
      let categorySlider = this.categories
        .at(categoryIndex)
        .get('categorySlider')?.value;
      if (!categorySlider) {
        this.categories.at(categoryIndex).patchValue({
          categorySlider: true,
        });
      }
    }
  }

  changePatientAssessment(event: any) {
    if (event.checked) {
      this.getAssessmentControl(
        this.currentCategoryIndex,
        this.currentAssessmentIndex
      ).patchValue({
        userIconShow: true,
      });
    } else {
      this.getAssessmentControl(
        this.currentCategoryIndex,
        this.currentAssessmentIndex
      ).patchValue({
        userIconShow: false,
      });
    }
  }
}
