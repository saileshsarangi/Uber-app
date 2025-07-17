import React, { createContext,useState,useEffect } from 'react'
export const UserDataContext = createContext()
function UserContext({ children }) {
      const [user, setUser] = useState({
        _id: '',
        email:'',
        fullname:{
            firstname:'',
            lastname:''
        }
      })
      
      useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    return (
        <div>
            <UserDataContext.Provider value={{user,setUser}}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext;