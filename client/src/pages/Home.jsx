import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home mt-5 container">
            <h1 className="homeh1">
                {" "}
                welcome to <b>XSS</b> test
            </h1>
            <h2 className="homeh2"> This is a xss test based on reflected type</h2>
            <br />
            <p className="homep">
                In this scenario, we have a vulnerable bank, which the customer1
                is making a transaction to the customer2.{" "}
                <p>
                    You must target customer1 in an XSS attack and deposit the transaction
                    amount into your account.
                </p>
                <p>
                    To get started, open a <Link to="/signUp"> new account</Link> with
                    this bank and join its customers .
                </p>
                <p>
                    To login, open a <Link to="/login"> login</Link>  .
                </p>
                <p>
                    In the next step, you can send a <Link to="/message">Message</Link>{" "}
                    from the message tab to customer1 and start the attack.
                </p>
                <p>Good luck!</p>
            </p>
        </div>
    );
}

export default Home;