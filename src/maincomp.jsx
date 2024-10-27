
import { Box, Paper,Stack, TextField,Button,Typography } from '@mui/material';

export default function MainComp() {
  
  
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{      
       width: '99%',
       marginTop: 2,
       marginLeft:1
      }}
    >

       <Paper 
        elevation={15} 
        sx={{ padding: 4, width: '100%' }}>
         <Stack spacing={2}>
         <Typography variant="h3"
              sx={{ textAlign: 'center', marginBottom:10}}>
              <strong>Coding Assignment Auto-review Tool</strong>
        </Typography>
        <p>Enter assignment details and GitHub repo URL to get an automated review.</p>
        <Typography variant="h5"
              sx={{ textAlign: 'left', marginBottom:1, paddingLeft:2}}>
              <strong>Assignment Description</strong>
        </Typography>
   
          <TextField id="outlined-basic"
           label="Текст повідомлення"
            variant="outlined"
                     
              required />

              <Stack spacing={20} direction={'row'}  justifyContent="center">
               <Button variant="contained"  color="success" >CodeReview</Button>
               <Button variant="contained"  color="success" > Clear  </Button>
              </Stack>
             
           
   
       
          </Stack>
        </Paper>
        
    </Box>
    
  );


}
