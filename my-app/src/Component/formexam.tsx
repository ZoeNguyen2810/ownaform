import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { FormLabel, FormControlLabel, RadioGroup, Radio, MenuItem, Button } from '@mui/material';
import Select from '@mui/material/Select';
import './formPremium.css'; // Import file CSS
import { createProfile } from '../Service/serviceApi.ts';
import { useMutation } from 'react-query';
import { Contact } from '../Type/typeForm.ts';
import { CentreDetails } from '../Type/typeForm.ts';
import { ApplicationForm } from '../Type/typeForm.ts';

function FormPremium1() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: '',
            surname: '',
            email: '',
            position: '',
            buyingService: 'No',
            name: '',
            address: '',
            suburb: '',
            postcode: '',
            state: '',
            centreEmail: '',
            centrePhone: '',
            goLiveDate: '',
            openingTime: '',
            closingTime: '',
            numberOfApprovedPlaces: '',
            additionalInfo: '',
        },
    });

    const mutation = useMutation(createProfile, {
        onSuccess: () => {
            reset();
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const onSubmit = (data) => {
        const [hour, minute] = data.openingTime.split(':').map(Number);
        const [hourClose, minuteClose] = data.closingTime.split(':').map(Number);

        const goLiveDate = data.goLiveDate
            ? new Date(data.goLiveDate).toISOString().split('T')[0]
            : '';
        const primaryContact: Contact = {
            firstName: data.firstName,
            surname: data.surname,
            phone: "",
            mobile: "",
            email: data.email,
            position: data.position,
        };

        const centreDetails: CentreDetails = {
            name: data.name,
            purchasingSettlementDate: "",
            address: data.address,
            suburb: data.suburb,
            email: data.centreEmail,
            phone: data.centrePhone,
            state: data.state,
            postcode: data.postcode,
            goLiveDate,
            openingTime: {
                hour: hour,
                minute: minute,
            },
            closingTime: {
                hour: hourClose,
                minute: minuteClose,
            },
            numberOfApprovedPlaces: Number(data?.numberOfApprovedPlaces),
            centreType: "",
        };
        const applicationForm: ApplicationForm = {
            primaryContact: primaryContact,
            centreDetails: [centreDetails],
        };

        mutation.mutate({
            data: applicationForm,
            reCaptcha: '00-8a38fa73e20bfeee1dbea8d67c477a29-e4d5d5c22f29d0ca-00',
        });
    };

    return (
        <FormControl className="form-control-container" style={{ marginLeft: '30%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <FormLabel htmlFor="firstName">First Name *</FormLabel>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: 'First Name is required' }}
                        render={({ field }) => <Input id="firstName" className="w350" {...field} />}
                    />
                </div>
                {errors.firstName && <p>{errors.firstName.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="surname">Last Name</FormLabel>
                    <Controller
                        name="surname"
                        control={control}
                        render={({ field }) => <Input id="surname" className="w350" {...field} />}
                    />
                </div>

                <div className="form-group">
                    <FormLabel htmlFor="email">Your Email *</FormLabel>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => <Input id="email" className="w350" {...field} />}
                    />
                </div>
                {errors.email && <p>{errors.email.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="position">Your Position/Role *</FormLabel>
                    <Controller
                        name="position"
                        control={control}
                        rules={{ required: 'Position is required' }}
                        render={({ field }) => <Input id="position" className="w350" {...field} />}
                    />
                </div>
                {errors.position && <p>{errors.position.message}</p>}

                <div>
                    <FormLabel>Are you buying an existing OWNA service?</FormLabel>
                    <Controller
                        name="buyingService"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup {...field} className="radio-group">
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        )}
                    />
                </div>


                <div className="form-group">
                    <FormLabel htmlFor="name">Centre/Service Name *</FormLabel>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Centre/Service Name is required' }}
                        render={({ field }) => <Input id="name" className="w350" {...field} />}
                    />
                </div>
                {errors.name && <p>{errors.name.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="address">Centre/Service Physical Address *</FormLabel>
                    <Controller
                        name="address"
                        control={control}
                        rules={{ required: 'Address is required' }}
                        render={({ field }) => <Input id="address" className="w350" {...field} />}
                    />
                </div>
                {errors.address && <p>{errors.address.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="suburb">Suburb *</FormLabel>
                    <Controller
                        name="suburb"
                        control={control}
                        rules={{ required: 'Suburb is required' }}
                        render={({ field }) => <Input id="suburb" className="w350" {...field} />}
                    />
                </div>
                {errors.suburb && <p>{errors.suburb.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="postcode">Centre/Service Postcode *</FormLabel>
                    <Controller
                        name="postcode"
                        control={control}
                        rules={{ required: 'Postcode is required' }}
                        render={({ field }) => <Input id="postcode" className="w350" {...field} />}
                    />
                </div>
                {errors.postcode && <p>{errors.postcode.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="state">State *</FormLabel>
                    <Controller
                        name="state"
                        control={control}
                        rules={{ required: 'State is required' }}
                        render={({ field }) => (
                            <Select id="state" className="w350" {...field}>
                                <MenuItem value="NSW">NSW</MenuItem>
                                <MenuItem value="ACT">ACT</MenuItem>
                                <MenuItem value="WA">WA</MenuItem>
                            </Select>
                        )}
                    />
                </div>
                {errors.state && <p>{errors.state.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="centreEmail">Centre/Service Email Address *</FormLabel>
                    <Controller
                        name="centreEmail"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => <Input id="centreEmail" className="w350" {...field} />}
                    />
                </div>
                {errors.centreEmail && <p>{errors.centreEmail.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="centrePhone">Centre/Service Phone Number *</FormLabel>
                    <Controller
                        name="centrePhone"
                        control={control}
                        rules={{ required: 'Phone number is required' }}
                        render={({ field }) => <Input id="centrePhone" className="w350" {...field} />}
                    />
                </div>
                {errors.centrePhone && <p>{errors.centrePhone.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="goLiveDate">Intended Go Live Date *</FormLabel>
                    <Controller
                        name="goLiveDate"
                        control={control}
                        rules={{ required: 'Go Live Date is required' }}
                        render={({ field }) => <Input type="date" id="goLiveDate" className="w350" {...field} />}
                    />
                </div>
                {errors.goLiveDate && <p>{errors.goLiveDate.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="openingTime">Centre/Service Opening Time *</FormLabel>
                    <Controller
                        name="openingTime"
                        control={control}
                        rules={{ required: 'Opening Time is required' }}
                        render={({ field }) => <Input type="time" id="openingTime" className="w350" {...field} />}
                    />
                </div>
                {errors.openingTime && <p>{errors.openingTime.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="closingTime">Closing Time *</FormLabel>
                    <Controller
                        name="closingTime"
                        control={control}
                        rules={{ required: 'Closing Time is required' }}
                        render={({ field }) => <Input type="time" id="closingTime" className="w350" {...field} />}
                    />
                </div>
                {errors.closingTime && <p>{errors.closingTime.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="numberOfApprovedPlaces">Centre/Service Approved Places *</FormLabel>
                    <Controller
                        name="numberOfApprovedPlaces"
                        control={control}
                        rules={{ required: 'Approved Places is required' }}
                        render={({ field }) => <Input id="numberOfApprovedPlaces" className="w350" {...field} />}
                    />
                </div>
                {errors.numberOfApprovedPlaces && <p>{errors.numberOfApprovedPlaces.message}</p>}

                <div className="form-group">
                    <FormLabel htmlFor="additionalInfo">Upload Additional Information *</FormLabel>
                    <Controller
                        name="additionalInfo"
                        control={control}
                        render={({ field }) => <Input id="additionalInfo" className="w350" {...field} />}
                    />
                </div>


                <Button type="submit" sx={{
                    backgroundColor: 'blue',
                    color: 'white',
                    width: '150px',
                    marginLeft: '40%',
                }}>
                    Submit
                </Button>
            </form>
        </FormControl>
    );
}

export default FormPremium1;
