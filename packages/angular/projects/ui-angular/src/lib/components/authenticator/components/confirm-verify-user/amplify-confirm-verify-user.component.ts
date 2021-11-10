import { Component, HostBinding, Input } from '@angular/core';
import { translate } from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

@Component({
  selector: 'amplify-confirm-verify-user',
  templateUrl: './amplify-confirm-verify-user.component.html',
})
export class ConfirmVerifyUserComponent {
  @HostBinding('attr.data-amplify-authenticator-confirmverifyuser')
  dataAttr = '';
  @Input() public headerText = translate(
    'Account recovery requires verified contact information'
  );

  // translated texts
  public skipText = translate('Skip');
  public submitText = translate('Submit');

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    const { updateForm, skipVerification, submitForm, error } =
      this.authenticator;
    return { updateForm, skipVerification, submitForm, error };
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm();
  }
}