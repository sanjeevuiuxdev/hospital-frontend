import React from 'react'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Input, TextField } from '@mui/material';

function SelectBox({data , onChange}) {
  return (
   <>
    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Remark Filter</InputLabel>
                        <Select style={{ width: "20%", marginBottom: "10px"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={onChange}
                            label="Remark"

                        >
                            
                            {data.map((item)=>{
                                return <MenuItem value={item.value}>{item.label}</MenuItem>
                            })}


                        </Select>
                    </FormControl>
                </Box>
   </>
  )
}

export default SelectBox