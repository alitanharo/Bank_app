import { createContext, useState } from "react";
import HttpService from "../util/HttpService";


export const MainContext = createContext({
    profile: {},
    handleGetProfile: () => { }
})

const Provider = ({ children }) => {
    const [profile, setProfile] = useState()

    const handleGetProfile = async () => {
        try {
            let { data } = await HttpService.get("/api/user/profile")
            setProfile(data)
        } catch (err) {
            setProfile(undefined)
        }
    }




    return (
        <MainContext.Provider value={{ profile, handleGetProfile }}>
            {children}
        </MainContext.Provider>
    );
}

export default Provider;