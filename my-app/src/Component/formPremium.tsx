import React , { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { FormLabel, FormControlLabel, RadioGroup, Radio, MenuItem, InputLabel, Button } from '@mui/material';
import './formPremium.css'; // Import file CSS
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createProfile } from '../Service/serviceApi.ts';
import { ApplicationForm, CentreDetails, Contact } from '../Type/typeForm.ts';
import { useMutation } from 'react-query';

function FormPremium() {
    const [age, setAge] = React.useState('');
    const [formData, setFormData] = useState({
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
        signature: '',
    });

    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleRadioChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, buyingService: value }));
    };
    const mutation = useMutation(createProfile, {
        onSuccess: (data) => {
            console.log(data);
            
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const [hour, minute] = formData.openingTime.split(':').map(Number);
        const [hourClose, minuteClose] = formData.openingTime.split(':').map(Number);

        
        const primaryContact : Contact = {
            firstName : formData.firstName,
            surname : formData.surname,
            phone : "",
            mobile : "",
            email : formData.email,
            position : formData.position
        }
        const centreDetails : CentreDetails = {
            name : formData.name,
            purchasingSettlementDate : "",
            address : formData.address,
            suburb : formData.suburb,
            email : formData.centreEmail,
            phone : formData.centrePhone,
            state : formData.state,
            postcode : formData.postcode,
            goLiveDate : formData.goLiveDate,
            openingTime : {
                hour : hour,
                minute : minute
            },
            closingTime : {
                hour : hourClose,
                minute : minuteClose
            },
            numberOfApprovedPlaces : Number(formData?.numberOfApprovedPlaces),
            centreType : "",
        }
        const applicationForm : ApplicationForm = {
            primaryContact : primaryContact,
            centreDetails : [centreDetails],
            reCaptcha : "123456789"
        }
        mutation.mutate(applicationForm)


    };
    return (
        <FormControl className="form-control-container" style={{ marginLeft : '30%'}}>
            {/* First Name */}
            <div className="form-group">
                <FormLabel htmlFor="firstName">First Name *</FormLabel>
                <Input id="firstName" aria-describedby="first-name-helper-text" className='w350'  onChange={handleInputChange} />
            </div>

            {/* Last Name */}
            <div className="form-group">
                <FormLabel htmlFor="surname">Last Name</FormLabel>
                <Input id="surname" aria-describedby="last-name-helper-text" className='w350' onChange={handleInputChange} />
            </div>

            {/* Email */}
            <div className="form-group">
                <FormLabel htmlFor="email">Your Email *</FormLabel>
                <Input id="email" aria-describedby="email-helper-text" className='w350' onChange={handleInputChange} />
            </div>

            {/* Position */}
            <div className="form-group">
                <FormLabel htmlFor="position">Your Position/Role *</FormLabel>
                <Input id="position" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange} />
            </div>

            {/* Radio Group */}
            <div>
                <FormLabel id="demo-radio-buttons-group-label">
                    Are you buying an existing OWNA service?
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="No"
                    name="radio-buttons-group"
                    className="radio-group"
                    
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" onChange={() => handleRadioChange('Yes')} />
                  <FormControlLabel value="No" control={<Radio />} label="No" onChange={() => handleRadioChange('No')} />
                </RadioGroup>

            </div>
            <div className="form-group">
                <FormLabel htmlFor="name">Centre/Service Name * </FormLabel>
                <Input id="name" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <FormLabel htmlFor="address">Centre/Service Physical Address *</FormLabel>
                <Input id="address" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange} />
            </div>

            <div className="form-group">
                <FormLabel htmlFor="suburb">
                    Suburb *</FormLabel>
                <Input id="suburb" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <FormLabel htmlFor="postcode">
                    Centre/Service Postcode  *</FormLabel>
                <Input id="postcode" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <FormLabel htmlFor="state">
                    State *</FormLabel>
                {/* <InputLabel id="demo-simple-select-label">State</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="state"
                    value={age}
                    label="Age"
                    onChange={(e) => handleRadioChange(e.target.value)}
                >
                    <MenuItem value={'NSW'}>NSW</MenuItem>
                    <MenuItem value={'ACT'}>ACT</MenuItem>
                    <MenuItem value={'WA'}>WA</MenuItem>
                </Select>
            </div>
            <div className="form-group">
                <FormLabel htmlFor="centreEmail">
                    Centre/Service Email Address *</FormLabel>
                <Input id="centreEmail" aria-describedby="position-helper-text" className='w350'  onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <FormLabel htmlFor="centrePhone">
                    Centre/Service Phone Number *</FormLabel>
                <Input id="centrePhone" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <FormLabel htmlFor="goLiveDate">
                    Intended Go Live Date  *</FormLabel>
                <Input type="date" id="goLiveDate" name="birthday" className='w350'/>
            </div>
            <div className="form-group">
                <FormLabel htmlFor="openingTime">
                    Centre/Service Opening Time  *</FormLabel>
                <Input type='time' id="openingTime" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <FormLabel htmlFor="closingTime">
                    Closing Time  *</FormLabel>
                <Input id="closingTime" type='time' aria-describedby="position-helper-text" className='w350' onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <FormLabel htmlFor="numberOfApprovedPlaces">
                    Centre/Service Approved Places *</FormLabel>
                <Input id="numberOfApprovedPlaces" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <FormLabel htmlFor="additionalInfo">
                    Upload Additional Information *</FormLabel>
                <Input id="additionalInfo" aria-describedby="position-helper-text" className='w350' onChange={handleInputChange}/>
            </div>
            
            <Button type="submit" style={{ backgroundColor : 'blue' , color : 'white'}} onClick={handleSubmit}>Submit</Button>
        </FormControl>
    );
}

export default FormPremium;
