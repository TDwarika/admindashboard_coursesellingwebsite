import Button from '@mui/material/Button'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AppBar() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    //isLoading can be used here to avoid the flash instead you will flash of empty.
    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                setAdmin(data.username);
            })
        })
    }, []);
    if (admin) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 6
        }}>

            <div>
                <Typography>CourseElite</Typography>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ padding: 8 }}>
                    <Typography>{admin}</Typography>
                </div>
                <div>
                    <Button variant="contained" onClick={() => {
                        localStorage.setItem("token", null);
                        window.location = "/";
                    }}>LogOut</Button>
                </div>
            </div>
        </div>
    }
    else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 6
        }}>
            <div>
                <Typography> CourseElite</Typography>
            </div>
            <div >
                <Button variant="contained" style={{ marginRight: 10 }}
                    onClick={() => {
                        navigate("/signup");
                    }}>SignUp</Button>
                <Button variant="contained" onClick={() => {
                    navigate("/signin");
                }}>LogIn</Button>
            </div>
        </div>
    }

}

export default AppBar;
