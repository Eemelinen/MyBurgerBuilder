import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement]

    if(props.invalid && props.validation && props.touched) {
        inputClasses.push(classes.Invalid)
    }

        switch(props.inputtype) {

            case 'text':
                inputElement = <input {...props}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                type={props.type}
                />
                break;

            case 'textarea':
                inputElement = <textarea {...props}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                />
                break;

            case 'select':
                inputElement = <select {...props}
                className={inputClasses.join(' ')}
                name='deliveryMethod'
                value={props.value}
                onChange={props.changed}
                >
                    {props.elementconfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue} </option>
                    ))}
                </select>
                break;

            default:
                inputElement = <input {...props}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                type={props.type}
                />    
        }

        return(
            <div className={classes.Input}>
                <label className={classes.Label}></label>
                {inputElement}
            </div>
        )
}

export default input;