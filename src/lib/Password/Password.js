import React from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput,} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Password = ({label,id,onChange,onFocus,value}) => {
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
          <FormControl sx={{marginTop:1.5}} variant="outlined" fullWidth >
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <OutlinedInput
            onChange={onChange}
            onFocus={onFocus}
            value={value}
            id={id}
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
                  {showPassword ? <VisibilityOff/> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
        </FormControl>
    </div>
  )
}

export default Password