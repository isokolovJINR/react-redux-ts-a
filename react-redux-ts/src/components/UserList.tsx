import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {fetchUsers} from "../store/action-creator/user";


const UserList: React.FC = () => {
    const {users, loading, error} = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())

    },[])
    if (loading) {
        return <h1>LOADIND...</h1>
    }
    if (error) {
        return <h1>error</h1>
    }

    return (
        <div>
            {users.map(user =>
                <div key={user.id} style={{padding: 15, marginTop: 10, border: '2px solid black', fontSize: 23}}>
                    {user.name} {user.email}
                </div>

            )}
        </div>
    );
};

export default UserList;