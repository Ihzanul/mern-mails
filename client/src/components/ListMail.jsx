import React, { useRef } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ReactToPrint from 'react-to-print'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  noPrint: {
    display: 'none'
  }
  
});

export default function ListMail() {
  const [mails, setMails] = React.useState(null)

  const classes = useStyles();
  const componentRef = useRef();

  React.useEffect(() => {
    axios.get('http://localhost:4000/list')
      .then(res => {
        setMails(res.data)
        // console.log(res.data[0])
      })
  }, [])

  const handleDelete = (id) => {
    const found = mails.find(mail => {
      return mail._id == id
    })
    // console.log(found)
    axios.post('http://localhost:4000/delete/:id', found)
      .then(res => console.log(res.data))
    axios.get('http://localhost:4000/list')
      .then(res => {
        setMails(res.data)
      // console.log(res.data[0])
    })
  }
  
  return mails !== null ? (
    <div id='table1'>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nomor Surat</TableCell>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">Stambuk</TableCell>
              <TableCell align="center">Semester</TableCell>
              {/* <TableCell align="center">TTD</TableCell> */}
              <TableCell  align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mails.map(mail => {
              // console.log(mail)
              return (
                <TableRow key={mail.number}>
                  <TableCell align="center" component="th" scope="mail">
                    {mail.number}
                  </TableCell>
                  <TableCell align="center">{mail.name}</TableCell>
                  <TableCell align="center">{mail.nim}</TableCell>
                  <TableCell align="center">{mail.semester}</TableCell>
                  {/* <div> */}
                    <TableCell  align="center">
                      <Link to={'/edit/'+mail._id} className={classes.link}>
                        Ubah
                      </Link>
                      |
                      <a href='#' onClick={() => handleDelete(mail._id)}>Hapus</a>
                    </TableCell>
                  {/* </div> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  ) : (
    <div>Loading</div>
  )
}