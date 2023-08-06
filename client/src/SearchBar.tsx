import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ onChange }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      <TextField onChange={onChange} autoComplete='off' id="outlined-basic" label="Search By Server" variant="outlined" />
    </Box>
    </div>
  );
}