import React from 'react'
import { useForm } from 'react-hook-form'
import './FirstForm.css'

const FirstForm = () => {

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    // const onSubmit = data => console.log(data);

    const delay = (d) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, d * 1000);
        })
    }

    const onSubmit = async (data) => {
        // await delay(2)
        let r = await fetch('http://localhost:3000/', {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(data)
        })
        let res = r.text()
        console.log(data)
    }

    return (
        <div className='container'>
            {isSubmitting && <div>is Submitting</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='frow'>
                    <div className='srow'>
                        <input placeholder='First name' {...register("firstname", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: 'min len is 3!' } })} />
                        {errors.firstname && <div>{errors.firstname.message}</div>}
                    </div>
                    <div className='srow'>
                        <input placeholder='Last Name' {...register("lastname", { minLength: { value: 3, message: 'min len is 3!' } })} />
                        {errors.lastname && <div>{errors.lastname.message}</div>}
                    </div>
                </div>
                <div className='frow'><div className='srow'>
                    <input placeholder='Email' type='email' {...register("email", { required: { value: true, message: 'this field is required' }, minLength: { value: 7, message: 'Min len is 7!' } })} />
                    {errors.email && <div>{errors.email.message}</div>}
                </div>
                    <div className='srow'>
                        <input placeholder='Mobile no.' type='number' {...register("phone", { minLength: { value: 10, message: 'Min len is 10!' }, maxLength: { value: 12, message: 'Max len is 12!' } })} />
                        {errors.phone && <span>{errors.phone.message}</span>}
                    </div>
                </div>

                <div className='frow'><div className='srow'>
                    <input placeholder='username' {...register("username", { required: { value: true, message: 'this is required' }, minLength: { value: 3, message: 'min len is 3!' } })} />
                    {errors.username && <div>{errors.username.message}</div>}
                </div>
                    <div className='srow'>
                        <input placeholder='password' type='password' {...register("password", { required: { value: true, message: 'this field is required' }, minLength: { value: 7, message: 'Min len is 7!' } })} />
                        {errors.password && <div>{errors.password.message}</div>}
                    </div>

                </div>

                <input disabled={isSubmitting} type="submit" value="submit" />
            </form>
        </div>

    )
}

export default FirstForm
