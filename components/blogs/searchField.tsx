import { searchByType } from '@/types';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { ChangeEvent, Ref } from 'react';


export default function SearchField ({searchField, initiateSearch, searchBy, handleSearchByChange}: {searchField:  Ref<HTMLInputElement>; initiateSearch: () => void, searchBy: searchByType; handleSearchByChange: (evnt: ChangeEvent<HTMLInputElement>, value: string) => void}) { 

  return (
      <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
          <TextField
              label="Search"
              variant="outlined"
              inputRef={searchField}
              sx={{
                  m: 1,
                  width: '55%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey', // Set the border color to grey
                  },
                  '&:hover fieldset': {
                    borderColor: 'darkgrey', // Darken the border on hover
                    cursor: 'pointer', // Add pointer cursor on hover
                  },
                },
                '& .MuiInputAdornment-root': {
                  cursor: 'pointer', // Add pointer cursor to the adornment
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={initiateSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />
          <FormControl sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <FormLabel sx={{pr: 1}} id="search_by">Search By</FormLabel>
              <RadioGroup
                row
                aria-labelledby="search_by"
                name="search_by"
                value={searchBy}
                onChange={handleSearchByChange}
              >
                <FormControlLabel value={searchByType.Location} control={<Radio />} label="Location" />
                <FormControlLabel value={searchByType.Publisher} control={<Radio />} label="Publisher" />
                <FormControlLabel value={searchByType.Title} control={<Radio />} label="Title" />                  
              </RadioGroup>
          </FormControl>
      </Box>
  );
}