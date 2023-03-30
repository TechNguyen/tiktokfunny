import Styles from './Signup.module.scss'
import classNames from 'classnames/bind'
import { app } from '~/firebase'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    signInWithPopup,
    getRedirectResult,
    GoogleAuthProvider,
    sendPasswordResetEmail,
} from 'firebase/auth'
import {
    faEye,
    faEyeSlash,
    faXmark,
    faCircleExclamation,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { ThemeContext } from '../../DefaultLayout/DefaultLayout'
import images from '~/assets/imgs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const cx = classNames.bind(Styles)
function Signup(props) {
    const [validEmail, setvalidEmail] = useState(false)
    const [valiPassword, setvaliPassword] = useState(false)
    const [valiresetemail, setvaliresetemail] = useState(false)
    const [show, setShow] = useState(false)
    const [useremail, setUseremail] = useState(null)
    const [userpassword, setUserPass] = useState(null)
    const [hidenForm, setHidenForm] = useState(false)
    const [state, setState] = useState('password')
    const themesign = useContext(ThemeContext)
    const [showForm, setShowForm] = useState(true)
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(false)
    const [hiden, setHiden] = useState(false)
    const [password, setPassword] = useState(null)
    const [isEmail, setisEmail] = useState(false)
    const [isResetEmail, setisresetEmail] = useState(false)
    const [found, setFound] = useState(false)
    const [isPassword, setisPassword] = useState(false)
    const [transform, setTransform] = useState(false)
    const [fogetPassword, setForgetPassword] = useState(true)
    const [chooseformin, setchooseformin] = useState(true)
    const [issignupEmail, setsignupemail] = useState(false)
    const [issignupPassword, setsignpassowrd] = useState(false)
    const [resetemail, setresetemail] = useState(null)
    const errorRef = useRef()
    const checkValid = (e) => {
        if (e.target.type === 'email') {
            e.target.value.trim() === '' ? setvalidEmail(false) : setvalidEmail(true)
        } else {
            e.target.value.trim() === '' ? setvaliPassword(false) : setvaliPassword(true)
        }
    }
    const checknewemail = (e) => {
        e.target.value.trim() === '' ? setvaliresetemail(false) : setvaliresetemail(true)
    }
    const setItemLocalStore = () => {
        localStorage.setItem()
    }
    const auth = getAuth(app)
    auth.languageCode = 'it'
    const handleSigninFacebook = () => {
        const provider = new FacebookAuthProvider()
        provider.addScope('user_birthday')
        provider.setCustomParameters({
            display: 'popup',
        })
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                const credential = FacebookAuthProvider.credentialFromResult(result)
                const accessToken = credential.accessToken
                props.handleUser()
                handleSetState()
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.customData.email
                const credential = FacebookAuthProvider.credentialFromError(error)
            })
    }
    const handleSignGoogle = () => {
        const providerGoogle = new GoogleAuthProvider()
        providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly')
        providerGoogle.setCustomParameters({
            login_hint: 'ndt13102003@gmail.com',
        })
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                const user = result.user
                props.handleUser()
                handleSetState()
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.customData.email
                const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }
    const handleShowSignup = () => {
        createUserWithEmailAndPassword(auth, useremail, userpassword)
            .then((userCredential) => {
                const data = {
                    username: useremail,
                    userpassword: userpassword,
                }
                const user = userCredential.user
                setUseremail('')
                setUserPass('')
            })
            .catch((error) => {
                console.log(error)
                if (error.code.includes('missing-email')) {
                    handleErrorSignup()
                } else if (error.code.includes('internal')) {
                    setsignpassowrd(true)
                    setsignupemail(true)
                } else if (error.code.includes('invalid-email')) {
                    setsignupemail(true)
                } else if (error.code.includes('email-already-in-use')) {
                    handleNotUser()
                } else {
                    setsignupemail(true)
                    handleErrorSignup()
                }
            })
    }
    const handleErrorSignup = () => {
        setError(true)
        setHiden(false)
        setsignupemail(true)
        setsignpassowrd(true)
        setTimeout(() => {
            setHiden(true)
            setTransform(false)
        }, 4500)
        setTimeout(() => {
            setTransform(true)
        }, 1500)
        clearTimeout()
    }

    const handleShowSignin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setEmail('')
                setPassword('')
                setError(false)
                setisEmail(false)
                const user = userCredential.user
                props.handleUser()
                handleSetState()
            })
            .catch((error) => {
                if (error.code.includes('missing-email')) {
                    handleError()
                } else if (error.code.includes('internal')) {
                    setisPassword(true)
                } else if (error.code.includes('user-not-found')) {
                    handleNotUser()
                } else if (error.code.includes('auth/wrong-password')) {
                    handleNotUser()
                } else {
                    setisEmail(true)
                }
            })
    }
    const handleGertUser = () => {
        getRedirectResult(auth)
            .then((result) => {
                const credential = FacebookAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                const user = result.user
                console.log(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.customData.email
                const credential = FacebookAuthProvider.credentialFromError(error)
                alert('error')
            })
    }
    const handleError = () => {
        setError(true)
        setHiden(false)
        setisEmail(true)
        setisPassword(true)
        setTimeout(() => {
            setHiden(true)
            setTransform(false)
        }, 4500)
        setTimeout(() => {
            setTransform(true)
        }, 1500)
        clearTimeout()
    }
    const handleErrorResetPass = () => {
        setError(true)
        setHiden(false)
        setisEmail(true)
        setisPassword(true)
        setTimeout(() => {
            setHiden(true)
            setTransform(false)
        }, 4500)
        setTimeout(() => {
            setTransform(true)
        }, 1500)
        clearTimeout()
    }
    const handleNotUser = () => {
        setFound(true)
        setHiden(false)
        setTimeout(() => {
            setHiden(true)
            setTransform(false)
        }, 4500)
        setTimeout(() => {
            setTransform(true)
        }, 1500)
        clearTimeout()
    }
    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, resetemail)
            .then(() => {
                setresetemail('')
                setForgetPassword(true)
            })
            .catch((error) => {
                console.log(error)
                if (error.code.includes('missing-email')) {
                    handleErrorResetPass()
                } else if (error.code.includes('user-not-found')) {
                    handleNotUser()
                } else {
                    setisresetEmail(true)
                }
            })
    }
    const handlechooseform = () => {
        chooseformin === true ? setchooseformin(false) : setchooseformin(true)
    }

    const handleSetState = props.func
    return (
        <div
            className={cx('form-sign', {
                showInputform: !hidenForm,
                hidenInputform: hidenForm,
            })}
        >
            {chooseformin ? (
                <>
                    <div
                        className={cx('message-error', {
                            showMessageError: error,
                            hidenMessageError: hiden,
                            show: showForm,
                        })}
                        ref={errorRef}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                                setError(false)
                                setHiden(true)
                            }}
                            className={cx('close-error')}
                        />
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className={cx('icon-error')}
                        />
                        <p>Input form is required!</p>

                        {transform ? <span className={cx('timeline')}></span> : <></>}
                    </div>

                    <div
                        className={cx('user-error', {
                            showMessageError: found,
                            hidenMessageError: hiden,
                        })}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                                setError(false)
                                setHiden(true)
                            }}
                            className={cx('close-error')}
                        />
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className={cx('icon-error')}
                        />
                        <p>Email or password isn't correct!</p>
                        {transform ? <span className={cx('timeline')}></span> : <></>}
                    </div>

                    <div
                        className={cx('form-valid', {
                            showSignForm: !hidenForm,
                            hidenSignForm: hidenForm,
                            dark: props.dark,
                        })}
                    >
                        <FontAwesomeIcon
                            className={cx('form-close_btn')}
                            icon={faXmark}
                            onClick={() => {
                                setHidenForm(!hidenForm)
                                setTimeout(() => {
                                    handleSetState()
                                }, 500)
                            }}
                        />
                        <img src="" alt="" />
                        <h2 className={cx('header-title')}>Welcome you to the TitTok!</h2>
                        <h3 className={cx('header-subtile')}>
                            Joinning and watching funny short videos
                        </h3>
                        <div className={cx('form')}>
                            {fogetPassword ? (
                                <div
                                    className={cx('form-input', {
                                        darkInput: props.dark,
                                    })}
                                >
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setisEmail(false)
                                        }}
                                        onBlur={(e) => {
                                            checkValid(e)
                                        }}
                                        id={cx('in_Email')}
                                        spellCheck={false}
                                    />
                                    {isEmail ? (
                                        <FontAwesomeIcon
                                            className={cx('input-error')}
                                            icon={faTriangleExclamation}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <label
                                        for="in_Email"
                                        className={cx({
                                            inputValid: validEmail,
                                            darkbg: props.dark,
                                        })}
                                    >
                                        Email
                                    </label>
                                </div>
                            ) : (
                                <div
                                    className={cx('form-input', {
                                        darkInput: props.dark,
                                    })}
                                >
                                    <input
                                        type="email"
                                        value={resetemail}
                                        onChange={(e) => {
                                            setresetemail(e.target.value)
                                            setisresetEmail(false)
                                        }}
                                        onBlur={(e) => {
                                            checknewemail(e)
                                        }}
                                        id={cx('in_ResetEmail')}
                                        spellCheck={false}
                                    />
                                    {isResetEmail ? (
                                        <FontAwesomeIcon
                                            className={cx('input-error')}
                                            icon={faTriangleExclamation}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <label
                                        for="in_ResetEmail"
                                        className={cx({
                                            inputValid: valiresetemail,
                                            darkbg: props.dark,
                                        })}
                                    >
                                        Email
                                    </label>
                                </div>
                            )}

                            {fogetPassword ? (
                                <div
                                    className={cx('form-input', {
                                        darkInput: props.dark,
                                    })}
                                >
                                    <input
                                        type={state}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setisPassword(false)
                                        }}
                                        onBlur={(e) => {
                                            checkValid(e)
                                        }}
                                        spellCheck={false}
                                        id={cx('in_Password')}
                                    />
                                    {show ? (
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            onClick={() => {
                                                setShow(false)
                                                setState('password')
                                            }}
                                            className={cx('password-icon')}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faEyeSlash}
                                            onClick={() => {
                                                setShow(true)
                                                setState('text')
                                            }}
                                            className={cx('password-icon')}
                                        />
                                    )}
                                    {isPassword ? (
                                        <FontAwesomeIcon
                                            className={cx('input-error')}
                                            icon={faTriangleExclamation}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <label
                                        for="in_Password"
                                        className={cx({
                                            inputValid: valiPassword,
                                            darkbg: props.dark,
                                        })}
                                    >
                                        Password
                                    </label>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className={cx('forget-form')}>
                                {fogetPassword ? (
                                    <p
                                        className={cx('forget-password')}
                                        onClick={() => {
                                            setForgetPassword(false)
                                        }}
                                    >
                                        Forget password?
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </div>
                            {!fogetPassword ? (
                                <div
                                    className={cx('signin_btn')}
                                    onClick={handleResetPassword}
                                >
                                    Reset password
                                </div>
                            ) : (
                                <div
                                    className={cx('signin_btn')}
                                    onClick={handleShowSignin}
                                >
                                    Log In
                                </div>
                            )}

                            <div
                                className={cx('login-another', {
                                    facebook: true,
                                    darkMode: props.dark,
                                })}
                                onClick={handleSigninFacebook}
                            >
                                <img src={images.facebook} alt="facebook" />
                                <p>Sign in with Facebook</p>
                            </div>
                            <div
                                className={cx('login-another', {
                                    google: true,
                                    darkMode: props.dark,
                                })}
                                onClick={handleSignGoogle}
                            >
                                <img src={images.google} alt="google" />
                                <p>Sign in with Google</p>
                            </div>

                            <div className={cx('signup')}>
                                <p>Don't have an account yet?</p>
                                <p
                                    className={cx('signup-link')}
                                    onClick={handlechooseform}
                                >
                                    Sign Up
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ////sign up

                <>
                    <div
                        className={cx('message-error', {
                            showMessageError: error,
                            hidenMessageError: hiden,
                            show: showForm,
                        })}
                        ref={errorRef}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                                setError(false)
                                setHiden(true)
                            }}
                            className={cx('close-error')}
                        />
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className={cx('icon-error')}
                        />
                        <p>Input form is required!</p>

                        {transform ? <span className={cx('timeline')}></span> : <></>}
                    </div>

                    <div
                        className={cx('user-error', {
                            showMessageError: found,
                            hidenMessageError: hiden,
                        })}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                                setError(false)
                                setHiden(true)
                            }}
                            className={cx('close-error')}
                        />
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className={cx('icon-error')}
                        />
                        <p>Account already exists !</p>
                        {transform ? <span className={cx('timeline')}></span> : <></>}
                    </div>

                    <div
                        className={cx('form-valid', {
                            showSignForm: !hidenForm,
                            hidenSignForm: hidenForm,
                            dark: props.dark,
                        })}
                    >
                        <FontAwesomeIcon
                            className={cx('form-close_btn')}
                            icon={faXmark}
                            onClick={() => {
                                setHidenForm(!hidenForm)
                                setTimeout(() => {
                                    handleSetState()
                                }, 500)
                            }}
                        />
                        <h3 className={cx('header-subtile')}>
                            Joinning and watching funny short videos
                        </h3>
                        <div className={cx('form')}>
                            <div
                                className={cx('form-input', {
                                    darkInput: props.dark,
                                })}
                            >
                                <input
                                    type="email"
                                    value={useremail}
                                    onChange={(e) => {
                                        setUseremail(e.target.value)
                                        setsignupemail(false)
                                    }}
                                    onBlur={(e) => {
                                        checkValid(e)
                                    }}
                                    id={cx('in_Email')}
                                    spellCheck={false}
                                />
                                {issignupEmail ? (
                                    <FontAwesomeIcon
                                        className={cx('input-error')}
                                        icon={faTriangleExclamation}
                                    />
                                ) : (
                                    <></>
                                )}
                                <label
                                    for="in_Email"
                                    className={cx({
                                        inputValid: validEmail,
                                        darkbg: props.dark,
                                    })}
                                >
                                    Email
                                </label>
                            </div>

                            <div
                                className={cx('form-input', {
                                    darkInput: props.dark,
                                })}
                            >
                                <input
                                    type={state}
                                    value={userpassword}
                                    onChange={(e) => {
                                        setUserPass(e.target.value)
                                        setsignpassowrd(false)
                                    }}
                                    onBlur={(e) => {
                                        checkValid(e)
                                    }}
                                    spellCheck={false}
                                    id={cx('in_Password')}
                                />
                                {show ? (
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        onClick={() => {
                                            setShow(false)
                                            setState('password')
                                        }}
                                        className={cx('password-icon')}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        onClick={() => {
                                            setShow(true)
                                            setState('text')
                                        }}
                                        className={cx('password-icon')}
                                    />
                                )}
                                {issignupPassword ? (
                                    <FontAwesomeIcon
                                        className={cx('input-error')}
                                        icon={faTriangleExclamation}
                                    />
                                ) : (
                                    <></>
                                )}
                                <label
                                    for="in_Password"
                                    className={cx({
                                        inputValid: valiPassword,
                                    })}
                                >
                                    Password
                                </label>
                            </div>

                            <div className={cx('signin_btn')} onClick={handleShowSignup}>
                                Sign Up
                            </div>

                            <div className={cx('signup')}>
                                <p>Do have an account yet?</p>
                                <p
                                    className={cx('signup-link')}
                                    onClick={handlechooseform}
                                >
                                    Log In
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default Signup
