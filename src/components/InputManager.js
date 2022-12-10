import React, {useState, useEffect} from "react";
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";

const InputManager = (props) => {

    const [hasToValidate, setHasToValidate] = useState(false);
    const [value, setValue] = useState(props.value.toString());
    const [isValid, setIsValid] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("")

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
        }
        if (!hasToValidate) {
            return;
        }
        if (props.validators) {
            for (let i = 0; i < props.validators.length; i++) {
                if (!props.validators[i](value)) {
                    const feedback = props.feedbackMessages[i];
                    if (isValid) {
                        setIsValid(false);
                    }
                    if (!isInvalid) {
                        setIsInvalid(true);
                    }
                    if (feedback !== feedbackMessage) {
                        setFeedbackMessage(feedback);
                    }
                    return;
                }
            }
        }
        if (!isValid) {
            setIsValid(true);
        }
        if (isInvalid) {
            setIsInvalid(false);
        }
    }, [value, setIsValid, setIsInvalid, isValid, isInvalid, feedbackMessage, hasToValidate, props.value, props.validators, props.feedbackMessages]);

    const onBlur = () => {
        if (!hasToValidate) {
            setHasToValidate(true);
        }
    }

    const onChange = (value) => {
        setValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    }

    return (
        <FormGroup floating>
            <Input
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                type={props.type}
                required={props.required}
                valid={isValid}
                invalid={isInvalid}
                onBlur={onBlur}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <FormFeedback>
                {feedbackMessage}
            </FormFeedback>
            <Label for={props.name}>
                {props.label}
            </Label>
        </FormGroup>
    );
}

export default InputManager;
