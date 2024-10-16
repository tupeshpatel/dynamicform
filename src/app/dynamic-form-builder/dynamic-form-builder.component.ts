import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css']
})

export class DynamicFormBuilderComponent implements OnInit {

  formGroup: FormGroup;
  formFields: any[] = [];
  newField: any = {
    label: '',
    type: 'text',
    options: '',
    placeholder: '',
    required: false
  };

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({});
  }

  addField() {
    const newFieldName = `field_${this.formFields.length}`;
    const newField = { ...this.newField, name: newFieldName };

    // Convert comma-separated options string to an array
    if (newField.type === 'dropdown' || newField.type === 'radio') {
      newField.options = newField.options.split(',').map((option: any) => option.trim());
    }

    // Add form control dynamically
    const control = this.fb.control('', this.newField.required ? Validators.required : null);
    this.formGroup.addControl(newFieldName, control);
    this.formFields.push(newField);

    this.newField = { label: '', type: 'text', options: '', placeholder: '', required: false };
  }

  // Opens the modal for adding a new field
  openFieldModal() {
    const modal = new bootstrap.Modal(document.getElementById('fieldModal'));
    modal.show();
  }

  saveField() {
    this.addField();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form Data:', this.formGroup.value);
      this.toastr.success('Form submitted successfully!');
    } else {
      this.toastr.error('Please fill out all required fields.');
    }
  }

  removeField(index: number) {
    const fieldName = this.formFields[index].name;
    this.formGroup.removeControl(fieldName);
    this.formFields.splice(index, 1);
  }

}
