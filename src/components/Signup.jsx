import {React, useState} from 'react'
import { Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
 } from '@/components/ui/card'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {fetchData} from '@/services/api.js'
import { NavLink, useNavigate } from 'react-router-dom'
const Signup = () => {   
      const [name , setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confPass, setConfPass] = useState('');

      const [nameErr, setNameErr] = useState('');
      const [emailErr, setEmailErr] = useState('');
      const [passErr, setPassErr] = useState('');
      const [confErr, setConfErr] = useState('');

      const [alertActive, setAlertActive] = useState('hidden');
      const [alertMsg, setAlertMsg] = useState('');

      const navigate = useNavigate();
      const handleSubmit = async () => {
            //Frontend Validations
            let valid = true;
            if(name == ''){
              setNameErr('Username cannot be empty');
              valid = false;
            }
            if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){ 
              setEmailErr('Invalid Email Address');
              valid = false;
            }
            if(password.length < 8){
              setPassErr('Password must be atleast 8 characters');
              valid = false;
            }
            if(password != confPass){
              setConfErr('Passwords do not match');
              valid = false;
            }

            if(valid === false)
              return;

            const signupReq = {name,email,password};

            const res = await fetchData('POST', '/api/user/signup', signupReq);
            const data = await res.json();
            if(data.Error != null){
                setAlertMsg(res.Error);
                setAlertActive('');

                setTimeout(() => {
                  setAlertActive('hidden');
                },3000);
            }
            else{
                navigate('/user');
            }
                
      }
      
      const removeError = (e) => {
          if(e.target.id == 'email' && emailErr != '')
              setEmailErr('');
          else if((e.target.id == 'password' && passErr != '') || (e.target.id == 'conf_password' && confErr != '')){
            setPassword('');
            setConfPass('');
            setPassErr('');
            setConfErr('');
          }
      }
  return (
    <>
        <Card className="max-w-md  mx-auto mt-20 bg-secondary">    
            <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center p-3">Signup</CardTitle>
            <CardDescription className="text-center">Create a New Account</CardDescription>
            <CardContent className="mt-5 space-y-7">
              <Alert className={"text-destructive border-destructive max-w-md mx-auto "+alertActive}>
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                  {alertMsg}
                </AlertDescription>
              </Alert>
                <div className="form_control">
                  <Input type="text" id="username" placeholder="Username" className="" onChange={e => setName(e.target.value)} value={name}/>
                  <CardDescription className="text-destructive ml-3">{nameErr}</CardDescription>
                </div>
                <div className="form_control">
                  <Input type="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} onFocus={removeError} value={email}/>
                  <CardDescription className="text-destructive ml-3">{emailErr}</CardDescription>
                </div>

                <div className="form_control">
                  <Input type="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} onFocus={removeError} value={password}/>
                  <CardDescription className="text-destructive ml-3">{passErr}</CardDescription>
                </div>
                
                <div className="form_control">
                  <Input type="password" id="conf_password" placeholder="Confirm Password" onChange={e => setConfPass(e.target.value)} onFocus={removeError} value={confPass}/>
                  <CardDescription className="text-destructive ml-3">{confErr}</CardDescription>
                </div>
                <Button className="w-full" onClick={handleSubmit}>Register</Button>
                <NavLink to="/login" className="hover:underline">
                  <CardDescription className="text-center mt-3">Already Registerd? Click Here to Loign</CardDescription>
                </NavLink>
            </CardContent>    
        </Card>
    </>
  )
}

export default Signup