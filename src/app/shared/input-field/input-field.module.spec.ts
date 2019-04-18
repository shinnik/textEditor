import { InputFieldModule } from './input-field.module';

describe('InputFieldModule', () => {
  let inputFieldModule: InputFieldModule;

  beforeEach(() => {
    inputFieldModule = new InputFieldModule();
  });

  it('should create an instance', () => {
    expect(inputFieldModule).toBeTruthy();
  });
});
