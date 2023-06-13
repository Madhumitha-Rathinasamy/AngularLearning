import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('otpInput1') otpInput1: ElementRef;
    @ViewChild('otpInput2') otpInput2: ElementRef;
    @ViewChild('otpInput3') otpInput3: ElementRef;
    @ViewChild('otpInput4') otpInput4: ElementRef;
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    currentStep: number = 1;
    otpForm: FormGroup;
    setPassword: FormGroup;
    tokens: any;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private snackbar: SnackbarServiceService
    ) {
        this.otpForm = this._formBuilder.group({
            otp1: [''],
            otp2: [''],
            otp3: [''],
            otp4: ['']
        });

        this.setPassword = this._formBuilder.group({
            password: new FormControl('', [Validators.required])
        })
    }

    handleOTPInput(event: any, nextInput: ElementRef | null) {
        if (event.target.value.length === 1 && nextInput) {
            nextInput.nativeElement.focus();
        }
    }

    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(12),
            ]),
            number: new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]{10}') // Regular expression for 10-digit phone numbers
            ])

        });
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        if (this.signUpForm.invalid) {
            return;
        }
        console.log(this.signUpForm.value)

        console.log("MADHU")

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            (response) => {
                if (response.statusCode == 201) {
                    this.currentStep++;
                }
                this.snackbar.success(response.message, 3000)
            },
            (error) => {
                console.log(error)
                this.snackbar.error(error.error.message, 4000)
            }
        );
    }

    checkOTP(): void {

        const { otp1, otp2, otp3, otp4 } = this.otpForm.value;
        const enteredOTP = otp1 + otp2 + otp3 + otp4;

        if (this.otpForm.invalid) {
            return;
        }
        let OTPValidation ={
            otp:enteredOTP,
            number :this.signUpForm.value.number
        }
        this._authService.submitOTP(OTPValidation).subscribe(
            (response) => {
                if (response.statusCode == 201) {
                    this.currentStep++;
                }
                this.snackbar.success(response.message, 3000)
            },
            (error) => {
                this.snackbar.error(error.error.message, 4000)
            }
        )
    }

    setpassword(): void {

        if (this.setPassword.invalid) {
            return;
        }
        let validation={
            token: this.tokens,
            password: this.setPassword.value
        }
        this._authService.resetPassword(validation).subscribe(
            (response) => {
                if (response.statusCode == 201) {
                    this.currentStep++;
                }
                this.snackbar.success(response.message, 3000)
            },
            (error) => {
                this.snackbar.error(error.error.message, 4000)
            }
        )
    }
}