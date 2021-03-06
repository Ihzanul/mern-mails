import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getThemeProps } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  form: {
    width: '90%',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto'
  },
  textField: {
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    width: '100%',
    margin: '30px auto'
  },
  input: {
    display: 'none',
  },
}));

export default function EditMail(props) {
  React.useEffect(() => {
    axios.get('http://localhost:4000/edit/' + props.match.params.id)
      .then(res => {
        setMail(res.data)
        console.log(res.data)
      })
  }, [])

  const classes = useStyles();
  const [mail, setMail] = React.useState(null)

  const handleChange = name => event => {
    setMail({ ...mail, [name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(mail)
    axios.post('http://localhost:4000/update/:id', mail)
      .then(res => console.log(res.data))
  }

  return mail !== null ? (
    <React.Fragment>
      <div className={classes.container}>
        <form className={classes.form} noValidate autoComplete="off">
          <h2 style={{ textAlign: 'center' }}>Tambah Surat dengan nomor : {mail.number}</h2>
          <TextField
            id="standard-name"
            label="Nama Mahasiswa"
            className={classes.textField}
            value={mail.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <TextField
            id="standard-nim"
            label="Stambuk"
            className={classes.textField}
            value={mail.nim}
            onChange={handleChange('nim')}
            margin="normal"
          />
          <TextField
            id="standard-semester"
            label="Semester"
            className={classes.textField}
            value={mail.semester}
            onChange={handleChange('semester')}
            margin="normal"
          />
          <TextField
            id="standard-sign"
            label="Tanda Tangan"
            className={classes.textField}
            value={mail.sign}
            onChange={handleChange('sign')}
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>
            Simpan
          </Button>
        </form>
      </div>
    </React.Fragment>
  ) : (
    <div>Loading</div>
  )
}