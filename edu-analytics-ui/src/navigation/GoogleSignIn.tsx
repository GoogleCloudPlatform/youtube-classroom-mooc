import React from 'react';
import { GoogleLogin } from 'react-google-login'
import { useRouter } from 'next/router'
import { userStore } from '@/store'

const GoogleSignIn = () => {

    const router = useRouter();
    const setUser = userStore(state => state.setUser)
    const onLoginSuccess = (response)=>{
        console.log('user logged in',response)
        setUser(response)
        router.push('/')
    }   

    const onLoginFailure = (err)=>{
        console.log('login failed',err)
        setUser(null)
    }

    return (
        <GoogleLogin
            clientId="532482101496-tmijs31sk91ohop17lmaq9br96oi758m.apps.googleusercontent.com"
            buttonText="Sign in with google"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleSignIn;