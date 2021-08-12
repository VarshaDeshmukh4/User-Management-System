import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { FormBuilder } from "@angular/forms";

describe("LoginComponent", () => {
  let fixture: LoginComponent;
  let authServiceMock: any;
  let formBuilderMock: FormBuilder;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
    };
    fixture = new LoginComponent[routerMock]();
    fixture.ngOnInit();
  });
  it('should create the app', () => {
    expect(LoginComponent).toBeTruthy();
  });

  describe("Test:login Form", () => {
    it("should invalidate the form", () => {
      fixture.loginForm.controls.email.setValue("");
      fixture.loginForm.controls.password.setValue("");
      expect(fixture.loginForm.valid).toBeFalsy();
    });
    it("should validate the form", () => {
      fixture.loginForm.controls.email.setValue("demo");
      fixture.loginForm.controls.password.setValue("123456");
      expect(fixture.loginForm.valid).toBeTruthy();
    });

    describe("Test:Form invalid", () => {
      it("should not call loginUser", () => {
        expect(fixture.loginForm.invalid).not.toHaveBeenCalled();
      });
    });
    describe("Test:Form valid", () => {
      it("should call loginUser", () => {
        const formData = {
          email: "demo",
          password: "123456",
        };
        const spyloginUser = jest
          .spyOn(authServiceMock, "login")
          .mockReturnValue(true);
        expect(authServiceMock.login(formData)).toBe(true);
        expect(spyloginUser).toHaveBeenCalledWith(formData);
      });
    });
  });
});
