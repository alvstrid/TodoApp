import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const password = '12345';
  const email = 'test@test.com';

  const mockAuthService = {
    register: jasmine.createSpy('register')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register', () => {
    component.registerForm.value.email = email;
    component.registerForm.value.password = password;
    component.register();
    expect(mockAuthService.register).toHaveBeenCalledWith(email, password);
  });

});
