import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import catClassApi from "../api/CatClassApi";
import { login, logout } from "../store/auth/authSlice";

export const useCheckAuth = () => {

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userToken = localStorage.getItem('userToken');
      if(!userToken) return dispatch(logout());
      console.log({userToken})
      try {
        const { data: userData, status } = await catClassApi.get(
          'users/me'
        )
        if(!userData) return dispatch(logout({errorMessage}));
        
        console.log({userData})
        const { role, username, _id, email } = userData
        
        dispatch(login({_id, email, username }));
      } catch ({ response, request, message }) {
        console.log({ response, request, message })
        if(response) {
          const { data, status } = response;
          dispatch(logout({ errorMessage: data.message }))
        }else if(request) {
          dispatch(logout())
        }else 
          dispatch(logout({ errorMessage: message }))
      }
    }

    fetchUser()
  }, []);

  return { status };
}