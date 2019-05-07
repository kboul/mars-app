import React, { Component } from 'react'
import Input from './Input'
import Joi from 'joi-browser'

class Form extends Component {
    state = { 
        data: {},
        errors: []
    }

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, { 
            abortEarly: false 
        })

        if (!result.error) return null

        const errors = {}
        for (let item of result.error.details)
            errors[item.path[0]] = item.message
        return errors
    }

    validateProperty = ({name, value}) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null
    }

    handleSubmit = e => {
        e.preventDefault()

        const errors = this.validate()
        // errors should not be null
        this.setState({ errors: errors || {} })
        if (errors) return 

        this.doSubmit()
    }

    // instead of e.currentTarget
    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const data = {...this.state.data}
        data[input.name] = input.value
        this.setState({ data, errors })
    }

    renderInput(name, label) {
        const { data, errors } = this.state
        return (
            <Input 
                name={name} 
                label={label}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange} />
        )
    }

    renderButton(label) {
        return (
            <button 
                disabled={this.validate()}
                type="submit"
                className="btn btn-secondary">
                {label}
            </button>
        )
    }
}
 
export default Form