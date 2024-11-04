import React from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput,} from '@mui/material'
import globalStyleCOnfig from '../../app.style.json'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const ReusableComponent = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };
  return (
    <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    </div>
  )
}

export default ReusableComponent