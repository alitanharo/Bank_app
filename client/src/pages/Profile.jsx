import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import HttpService from "../util/HttpService";
import { MainContext } from './../context/Provider';



const Profile = () => {

    const { profile, handleGetProfile } = useContext(MainContext)
    console.log(profile);


    useEffect(() => {
        handleGetProfile()
    }, [])

    const [form, setForm] = useState({
        amount: 0,
        receiver: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await HttpService.post("/api/user/transaction", form)
            toast.success("Transaction Submit.")
            handleGetProfile()
        } catch (ex) {
            toast.error("Transaction Error.")
        }

    }

    return (
        <div className="container">
            <div className="shadow-sm rounded border mt-5 p-5">
                <div className="d-flex">
                    <p className="fw-bold mx-3">Email:</p>
                    <p>{profile?.email}</p>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <th>#</th>
                        <th>Account Number</th>
                        <th>Balance</th>
                    </thead>
                    <tbody>
                        {profile?.accounts.map((item, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.accountNumber}</td>
                                <td>{item.balance}</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            <div className="shadow-sm rounded border mt-5 p-5">

                <form className="d-flex  align-items-center justify-content-center" onChange={handleChange} onSubmit={handleSubmit}>
                    <h3 className="fw-bolder my-2 mx-3">Transaction:</h3>
                    <div className="my-2">
                        <label htmlFor="receiver" className="mx-2">Receiver</label>
                        <input className="border p-1 rounded " name="receiver" />
                    </div>
                    <div className="my-2">
                        <label htmlFor="amount" className="mx-2">Amount</label>
                        <input className="border p-1 rounded " name="amount" />
                    </div>
                    <button type="submit" className="btn btn-outline-success mx-3">Submit</button>

                </form>


            </div>
        </div>
    );
}

export default Profile;