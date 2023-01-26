import React from 'react'

export const InputField = ({label, changeValue, error, errorOccur, ...field}) => {
    return (
        <div className="col-md-6">
            <div className="mb-3">
                <label htmlFor={field.name} className="form-label">{label}</label>
                <input className="form-control" {...field} id={field.name} onChange={changeValue} onKeyUp={errorOccur} onBlur={errorOccur} />
                <small>{error[field.name]}</small>
            </div>
        </div>
    )
}
