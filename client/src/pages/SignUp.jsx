
import { useNavigate } from 'react-router';
import { useState } from 'react';
import HttpService from '../util/HttpService';
const SignUp = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [message, setMessage] = useState()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (form.username.length > 2 && form.password.length > 2) {
                await HttpService.post("/api/user/signUp", form)
                navigate("/profile")
            } else {
                setMessage("Invalid Username Or Password")
            }

        } catch (ex) {
            setMessage("Invalid Username Or Password")
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className="mx-auto">
            <div className="card mx-auto p-4 shadow-sm mt-5" style={{ maxWidth: "400px" }}>
                <h1 className="mx-auto text-primary py-3">SignUp</h1>
                <form onSubmit={handleSignUp} onChange={handleChange}>
                    <div className="d-flex flex-column">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="border rounded p-1"
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="email">email</label>
                        <input
                            type="text"
                            name="email"
                            className="border rounded p-1"
                        />
                    </div>

                    <div className="d-flex flex-column my-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="border rounded p-1"

                        />
                    </div>

                    {message && <p className="text-danger my-3">{message}</p>}

                    <button className="mt-4 btn btn-primary w-100">Sign Up</button>

                </form>
            </div>
        </div>
    );
}

export default SignUp;