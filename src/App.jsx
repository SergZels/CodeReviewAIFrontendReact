import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { Box, Paper,Stack, TextField,Button,Typography, FormControl,FormLabel,RadioGroup,Radio,FormControlLabel  } from '@mui/material';


function App() {

  const [description, setDescription] = useState("");
  const [gitRepo, setGitRepo] = useState("");
  const [openAiKey, setopenAiKey] = useState("");
  const [githubAiKey, setgithubAiKey] = useState("");
  const [level, setlevel] = useState("Junior");
  const [filePath, setFilePath] = useState("");
  const [rewiew, setrewiew] = useState("");

  async function submData() {
    try {
     // const resp = await axios.post('https://zelse.asuscomm.com/CodeReviewAIv2/reviewFrontend',{
      const resp = await axios.post('http://localhost:7777/reviewFrontend', {  
        assignment_description: description,
        github_repo_url: gitRepo,
        candidate_level: level,
        gitHubApiKey: githubAiKey,
        openAIApiKey: openAiKey
      });
  
      // Виведення відповіді в консоль
      console.log('Response:', resp.data);
    
      const { prompt } = resp.data;
      const {  GPTReview } = resp.data;
      setrewiew(GPTReview +"\n\n\n Prompt: \n" + prompt );

       // Витягуємо назви файлів
    const files = resp.data.file_paths.map((filePath) => {
      return filePath.split('\\').pop().split('/').pop();
    });

    // Форматуємо список назв файлів для відображення в TextField
    setFilePath(files.map(file => `• ${file}`).join("\n")); // Додаємо символ для списку та новий рядок

  
    } catch (e) {
      console.error('Error:', e);
      if (e.response && e.response.data) {
        const errorData = JSON.stringify(e.response.data, null, 2); // Форматуємо JSON з відступами
        setrewiew(`Error: ${e.message}\nDetails:\n${errorData}`);
      } else {
        setrewiew(`Error: ${e.message}`);
      }
    }
  }
 
  function clear() {
    setDescription("");
    setGitRepo("");
    setopenAiKey("");
    setgithubAiKey("");
    setFilePath("");
    setrewiew("");
    setlevel("Junior");
  };
 

  return (
    <>
 <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{      
       width: '100%',
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
              label="Enter a description here"
                variant="outlined"
                multiline
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                rows={4} // Кількість рядків для висоти поля
                fullWidth     
                required />

            <Typography variant="h5"
                  sx={{ textAlign: 'left', marginBottom:1, paddingLeft:2}}>
                  <strong>GitHub Repo URL</strong>
            </Typography>
            <TextField id="outlined-basic"
              label="Enter URL here"
                variant="outlined"
                multiline
                onChange={(event) => setGitRepo(event.target.value)}
                value={gitRepo}
                fullWidth     
                required />

              <Typography variant="h5"
                  sx={{ textAlign: 'left', marginBottom:1, paddingLeft:2}}>
                  <strong>Github API Key </strong>
            </Typography>
            <TextField id="outlined-basic"
              label="Enter Key here"
                variant="outlined"
                onChange={(event) => setgithubAiKey(event.target.value)}
                value={githubAiKey}
                multiline
                fullWidth     
                         
                required />

             <Typography variant="h5"
                  sx={{ textAlign: 'left', marginBottom:1, paddingLeft:2}}>
                  <strong>Openai API Key</strong>
            </Typography>
            <TextField id="outlined-basic"
              label="Enter Key here"
                variant="outlined"
                onChange={(event) => setopenAiKey(event.target.value)}
                value={openAiKey}
                multiline
                fullWidth     
                         
                required />

    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Candidate Level</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={level} // Задає поточне значення вибору
        onChange={(event) => setlevel(event.target.value)} // Оновлює значення при виборі
      >
        <FormControlLabel value="Junior" control={<Radio />} label="Junior" />
        <FormControlLabel value="Middle" control={<Radio />} label="Middle" />
        <FormControlLabel value="Senior" control={<Radio />} label="Senior" />
        
      </RadioGroup>
    </FormControl>

            <Stack spacing={20} direction={'row'}  justifyContent="center">
                  <Button variant="contained" onClick={submData}   color="success" >CodeReview</Button>
                  <Button variant="contained"  onClick={clear} color="alert" > Clear  </Button>
            </Stack>
             
        <Typography variant="h5"
                  sx={{ textAlign: 'left', marginBottom:1, paddingLeft:2}}>
                  <strong>Files find in repository</strong>
            </Typography>
            <TextField id="outlined-basic"
              
                value={filePath}
                variant="outlined"
                multiline
                rows={6} // Кількість рядків для висоти поля
                fullWidth     
                required />  

       <Typography variant="h5"
                  sx={{ textAlign: 'left', marginBottom:1, paddingLeft:2}}>
                  <strong>Revew result</strong>
            </Typography>
            <TextField id="outlined-basic"
            
              value={rewiew}
                variant="outlined"
                multiline
                rows={17} 
                fullWidth     
                required 
                sx={{
                  backgroundColor: '#fef9e7', 
                }}
               
                />  
       
          </Stack>
        </Paper>
        
    </Box>
    </>
  )
}

export default App
