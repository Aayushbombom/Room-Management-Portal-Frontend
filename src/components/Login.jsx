import { React, useState } from 'react'
import { fetchData } from '@/services/api'
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
import { NavLink, redirect, useNavigate } from "react-router-dom"
import { Checkbox } from '@/components/ui/checkbox'

///^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/ -> For Email Validation
const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isAdmin, setIsAdmin] = useState(false);

      const [emailErr, setEmailErr] = useState('');
      const [passErr, setPassErr] = useState('');

      const [alertActive, setAlertActive] = useState('hidden');
      const [alertMsg, setAlertMsg] = useState('');

      const navigate = useNavigate();

      const handleSubmit = async () => {
            //Frontend Validations
            let valid = true;
            if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){ 
               setEmailErr('Invalid Email Address');
               valid = false;
            }
            
            if(password.length < 8){
              setPassErr('Password must be atleast 8 characters');
              valid = false;
            }
              
            if(valid === false)
              return;
            //Backend Validations

            const loginReq = {email,password};
          try{
            const res = await fetchData('POST', `/api/user/login?isAdmin=${isAdmin}`, loginReq);
            const data = await res.json();
            if(data.Error != undefined){
                setAlertMsg(data.Error);
                setAlertActive('');

                setTimeout(() => {
                  setAlertActive('hidden');
                }, 3000);
            }
            else if(res.status != 200){
               setAlertMsg("Some Error Occured");
               setAlertActive('');

                setTimeout(() => {
                  setAlertActive('hidden');
                }, 3000);
            }
            else{
                if(isAdmin)
                    navigate('/admin');
                else
                    navigate('/user');
            }
          }
          catch(e){
              console.log("some error occured");
          }
            
      }
      
      const removeError = (e) => {
          if(e.target.id == 'email' && emailErr != '')
              setEmailErr('');
          else if((e.target.id == 'password' && passErr != '')){
              setPassword('');
              setPassErr('');
          }
      }
  return (
    <>
        <Card className="max-w-md  mx-auto mt-20 bg-secondary">    
            <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center p-3">Login</CardTitle>
            <CardDescription className="text-center">Login to get access</CardDescription>
            <CardContent className="mt-5 space-y-7">
              <Alert className={"text-destructive border-destructive max-w-md mx-auto "+alertActive}>
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                  {alertMsg}
                </AlertDescription>
              </Alert>
                <div className="form_control">
                  <Input type="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} onFocus={removeError} value={email}/>
                  <CardDescription className="text-destructive ml-3">{emailErr}</CardDescription>
                </div>

                <div className="form_control">
                  <Input type="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} onFocus={removeError} value={password}/>
                  <CardDescription className="text-destructive ml-3">{passErr}</CardDescription>
                </div>
                <Button className="w-full" onClick={handleSubmit}>Login</Button>
                <div className="items-top flex space-x-2 justify-center mb-16">
                  <Checkbox id="checkAdmin" onClick={e => setIsAdmin(e.target.ariaChecked != 'true')}/>
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Login as Admin
                    </label>
                </div>
                <NavLink to="/signup" className="hover:underline mt-20"><CardDescription className="text-center mt-3">Not Registerd? Click Here to Register</CardDescription></NavLink>
            </CardContent>    
        </Card>
    </>
  )
}

export default Login


export const loginLoader = async () => {
  try{
    const res = await fetchData("GET", "/api/checkjwt");
    if(res.status == 200){
      const data = await res.json();
      console.log(data);
      if(data.type == 'Adminjwt')
          return redirect('/admin');
      else
          return redirect('/user');
    }
      
  }
  catch(e){
     console.log("failed to fetch");
  }
    

    return null;
}