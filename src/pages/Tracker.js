import {React, useState, useEffect} from 'react'
import { getAllItems } from '../services/Apis'
import ItemCard from '../components/ItemCard'
import { FormControl, TextField  } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { Button, Grid, Typography } from '@mui/material'
import moment from 'moment';



const Tracker = () => {
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [listByDate, setListByDate] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);
 
  const calculateCalories = (list) => {
    list.forEach((item) => {
      let calories = 0;
      item.entry.forEach((entry) => {
        calories += entry.calories;
      })
      item.totalCalories = calories;
    })
  }

  const formatList = (list) => {
    list.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });

    const groups = list.reduce((groups, entry) => {
      const dateKey = entry.date.split('T')[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(entry);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        entry: groups[date]
      };
    });
    calculateCalories(groupArrays);
    setListByDate(groupArrays);
  }

  useEffect(() => {
    const fetchData = async () => {
      const list = await getAllItems();
      formatList(list);
      setList([...list]);
    }
    fetchData();
    setLoading(false);
  },[isLoading])

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };
  
  useEffect(() => {
  },[list])

  
  const submit = () => {
    const l = list.filter((e) => {
      if(moment(e.date) >=  moment(startDate) && moment(e.date) <=moment(endDate)){
        return e;
      }
    })
    formatList(l);
    setList(l);
  }

  const buttonActive = () => {
    return !(startDate?._isValid && endDate?._isValid);
  }

  if (isLoading) return 'Loading...';

  return (
    <div>
      <FormControl>
        <Stack direction="row" justifyContent="center"
              alignItems="center" spacing={2} sx={{margin:10}}>
                <Typography variant="h3" sx={{marginLeft:10}}>
                  Filter by date
                </Typography>
            <LocalizationProvider dateAdapter={ AdapterMoment }>
                <DesktopDatePicker
                required
                label="Start Date"
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={handleStartDate}
                renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                required
                label="End Date"
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={handleEndDate}
                disableFuture
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button variant={ buttonActive() ? 'outlined' : 'contained'} disabled={ buttonActive() } size="large" onClick={submit}>Filter</Button>
        </Stack>
    </FormControl>
   
      {!isLoading&&listByDate?.map((item,index) => (
        <div key={index}>
        <Typography variant="h6" sx={{marginLeft:10}}>{item.date}</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="left"
        >
          {item.entry.map((e) => (
              <ItemCard name={e.name} calories={e.calories} date={e.date} key={e._id} calorieExcess={item.totalCalories>200}></ItemCard>
          ))} 
        </Grid>
        </div>
      ))}
      {list.length === 0 && 
        <Typography variant="h2" sx={{marginLeft:10}}>
          No records!
        </Typography>
      }
    </div>
  )
}

export default Tracker