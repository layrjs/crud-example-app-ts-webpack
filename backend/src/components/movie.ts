import {Component, expose, validators} from '@layr/component';
import {Storable, primaryIdentifier, attribute} from '@layr/storable';

const {notEmpty} = validators;

@expose({
  find: {call: true},
  prototype: {
    load: {call: true},
    save: {call: true},
    delete: {call: true}
  }
})
export class Movie extends Storable(Component) {
  @expose({get: true, set: true}) @primaryIdentifier() id!: string;

  @expose({get: true, set: true}) @attribute('string', {validators: [notEmpty()]}) title = '';

  @expose({get: true, set: true}) @attribute('number?') year?: number;

  @expose({get: true, set: true}) @attribute('string') country = '';
}
