import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[githubValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: GithubValidator,
      multi: true,
    },
  ],
})
export class GithubValidator {
  static usernameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    if (control.value.length < 1 || control.value.length > 39) {
      return { length: true };
    }

    const usernameRegex = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
    if (!usernameRegex.test(control.value)) {
      return { invalidFormat: true };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(control.value)) {
      return { emailCharacter: true };
    }

    if (control.value.startsWith('-') || control.value.endsWith('-')) {
      return { invalidFormat: true };
    }

    if (/--/.test(control.value)) {
      return { invalidFormat: true };
    }

    return null;
  }
}
