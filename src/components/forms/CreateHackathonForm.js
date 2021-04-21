import React, { useState } from 'react';
import {Card, CardBody, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import DateTimePicker from 'react-datetime-picker';
import { createHackathon, createHackathonAndFetchHackathons } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router';

function CreateHackathonForm(props) {
    const [end_date, changeEndDate] = useState(new Date());
    const [start_date, changeStartDate] = useState(new Date());
    const [hackathonData, setHackathonData] = useState({})
    const error = useSelector(state => state.error);
    const dispatch = useDispatch()
    const { user } = useAuth0();
    const [checked, setChecked] = useState(false)
    const redirectTo = useSelector(state => state.redirectTo)

    const fields = [
        { 
            id: "name",
            name: "Name",
            type: "text",
            required: true

        },
        { 
            id: "location",
            name: "Location",
            type: "text",
            required: true
        },
        {
            id: "description",
            name: "Description",
            type: "textarea",
            required: true
        },
        { 
            id: "is_open",
            name: "Open",
            type: "checkbox",
            required: false,
            supportingText: "Check this if users should be allowed to register at this time."
        },
    ]

    function handleChange(e) {
        setHackathonData({
            ...hackathonData,
            [e.target.id]: e.target.value
        })
    }

    async function handleValidSubmit(e) {
        e.persist();
        const creatorId = user.sub.replace("auth0|", "")
        const body = {
            ...hackathonData, 
            start_date: start_date,
             end_date: end_date,
             is_open: checked
            }
        // will dispatch a series of actions that will redirect if no error
        dispatch(createHackathonAndFetchHackathons(creatorId, body, '/dashboard'))
    }

    if (redirectTo) {
        console.log(redirectTo)
        return <Redirect to={redirectTo} />
    }
    
    return (
        <Container>
            <h1>Let's Create a Hackathon</h1>
        <AvForm onSubmit={handleValidSubmit}>
            <div className="col">
                <Card>
                <CardBody>
            <FormGroup>
            {fields.map(field => (
                <div className="form-group mb-2">
                {(field.type) === "checkbox" ? (
                    <div className="form-check">
                        <Label check>
                        <AvInput onChange={() => setChecked(!checked)}
                        type={field.type} trueValue={true} 
                        falseValue={false} id={field.id} 
                        label={field.name} name={field.name} 
                        className="form-check-input" />
                        Open Hackathon?
                        </Label>
                          
                        <small className="form-text text-muted">{field.supportingText}</small>
                    </div>
                ) : (
                    <div>
                    <AvField onChange={handleChange} required={field.required} type={field.type} id={field.id} name={field.name} label={field.name} />
                    </div>
                )}
                </div>
            ))}
          
            <div>
            <p className="mb-0"><Label for="start_date">Start Date</Label></p>
            <DateTimePicker
            onChange={changeStartDate}
            value={start_date}
            />
            </div>

            <div>
            <p className="mb-0"><Label for="end_date">End Date</Label></p>
            <DateTimePicker
            onChange={changeEndDate}
            value={end_date}
            />
            </div>

             
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">Submit</button> 
            </div>
            </FormGroup>
            </CardBody>
            </Card>
            </div>
        </AvForm>
        </Container>
    );
}

export default withAuthenticationRequired(CreateHackathonForm, {
    onRedirecting: () => <Loader />,
  });