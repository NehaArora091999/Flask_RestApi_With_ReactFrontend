import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const useStyles = makeStyles({
 stuListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
})

const List = () => {
 const classes = useStyles();
 const [employee, setemployee] = useState([]);

 useEffect(() => {
  async function getAllemployee() {
   try {
    const employee = await axios.get("http://localhost:5000/employeeList",{
        'method' : 'GET',
        headers:{
        "Access-Control-Allow-Origin" : "*",
        'Content-Type' : 'application/json'
        }
      }
    )
    setemployee(employee.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllemployee();
 }, [])

 const handleDelete = async id => {
  await axios.get(`http://localhost:5000/delete/${id}`,{
    'method' : 'get',
        headers:{
          'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json'
        }
  });
  var newemployee = employee.filter((item) => {
   // console.log(item);
   return item.id !== id;
  })
  setemployee(newemployee);
 }


 return (
  <>
   <Box textAlign="center" p={2} className={classes.stuListColor}>
    <Typography variant="h4">employee List</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>salary</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {
       employee.map((employee, i) => {
        return (
         <TableRow key={i}>
          <TableCell align="center">{i + 1}</TableCell>
          <TableCell align="center">{employee.uname}</TableCell>
          <TableCell align="center">{employee.email}</TableCell>
          <TableCell align="center">{employee.salary}</TableCell>
          <TableCell align="center">
           
           <Tooltip title="Edit">
            <IconButton><Link to={`/edit/${employee.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(employee.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
        )
       })
      }

     </TableBody>
    </Table>
   </TableContainer>
  </>
 )
}

export default List






