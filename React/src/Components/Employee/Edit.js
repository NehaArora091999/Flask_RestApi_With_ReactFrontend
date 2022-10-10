import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Edit = () => {
 const classes = useStyles();
 const { id } = useParams();
 const history = useHistory();
 const [employee, setemployee] = useState({
  id:id,
  name: "",
  email: "",
  salary:""
 });
 useEffect(() => {
  async function getemployee() {
   try {
    const employee = await axios.get(`http://localhost:5000/employeeUpdate/${id}`,
    {
        'method' : 'POST',
        headers:{
          'Content-Type' : 'application/json'
        }
      }
    )
    setemployee(employee.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getemployee();
 }, [id]);

 function onTextFieldChange(e) {
  setemployee({
   ...employee,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.post(`http://localhost:5000/employeeUpdate`, employee)
   history.push("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 function handleClick() {
  history.push("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
    <Typography variant="h2">Employee Management</Typography>
   </Box>

   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Edit employee</Typography>
     </Box>
     <form>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" label="Name" value={employee.name} onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={employee.email} onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="salary" name="salary" variant="outlined" required fullWidth id="salary" label="salary" value={employee.salary} onChange={e => onTextFieldChange(e)} />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid >
  </>
 )
}

export default Edit
