import React from "react";
import {Container, Form, FormGroup, FormText, Input, Label} from "reactstrap";

const CheckBoxGroup = (props) => {

    const title = props.title;
    const values = props.values;
    const selectedValues = props.selectedValues;

    const onClick = (value) => {
        if (props.onClick) {
            props.onClick(value);
        }
    }

    return (
        <Container>
            <Form>
                <FormText>{title} :</FormText>
                {
                    values.map((value, index) =>
                        <FormGroup key={index} check className={"margin-left-20px"}>
                            <Input
                                id={title + "_" + value}
                                name={title + "_" + value}
                                type="checkbox"
                                checked={selectedValues.includes(value)}
                                onChange={() => onClick(value)}
                            />
                            <Label
                                check
                                for={title + "_" + value}
                            >
                                {value}
                            </Label>
                        </FormGroup>
                    )
                }
            </Form>
        </Container>
    );
}

export default CheckBoxGroup;
