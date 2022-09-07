import { React, useState, useEffect } from 'react'
import { getAllItems, getCalorieLimit } from '../services/Apis'
import ItemCard from '../components/ItemCard'
import { FormControl, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { Button, Grid, Typography, Tooltip } from '@mui/material'
import moment from 'moment';
import ErrorIcon from '@mui/icons-material/Error';

const Tracker = ({ reload }) => {
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [listByDate, setListByDate] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [calorieLimit, setCalorieLimit] = useState(0)

  const [filtered, setFiltered] = useState([])

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
    list.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
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
      setFiltered([...list])
    }
    const fetchCalorieLimit = async () => {
      const calorieLimit = await getCalorieLimit();
      setCalorieLimit(calorieLimit);
    }

    fetchData();
    fetchCalorieLimit();
    setLoading(false);
  }, [isLoading, reload])

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  useEffect(() => {
  }, [list])


  const submit = () => {
    const l = list.filter((e) => {
      if (moment(e.date) >= moment(startDate).subtract(1, 'days') && moment(e.date) <= moment(endDate)) {
        return e;
      }
    })
    formatList(l);
    setFiltered(l);
  }

  const buttonActive = () => {
    return !(startDate?._isValid && endDate?._isValid);
  }

  if (isLoading) return 'Loading...';

  return (
    <div>
      <FormControl>
        <Stack direction="row" justifyContent="center"
          alignItems="center" spacing={2} sx={{ margin: 10 }}>
          <Typography variant="h3" sx={{ marginLeft: 10 }}>
            Filter by date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              required
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              value={startDate}
              onChange={handleStartDate}
              disableFuture
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
          <Button variant={buttonActive() ? 'outlined' : 'contained'} disabled={buttonActive()} size="large" onClick={submit}>Filter</Button>
        </Stack>
      </FormControl>

      {!isLoading && listByDate?.map((item, index) => (
        <div key={index}>
          <Typography variant="h6" sx={{ marginLeft: 10, mt:10 }}>{moment(item.date).format('DD-MM-YYYY')}
            {(item.totalCalories > calorieLimit) && <Tooltip title="Exceeded Calorie Limit for this day!">
              <ErrorIcon size="large" sx={{ ml: 2 ,mt: 2  }} />
            </Tooltip>}
          </Typography>
          <Typography variant="h7" sx={{ marginLeft: 10 }}>{item.totalCalories + " calories consumed"}</Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="left"
          >
            {item.entry.map((e) => (
              <ItemCard name={e.name} calories={e.calories} date={e.date} key={e._id} calorieExcess={item.totalCalories > calorieLimit}></ItemCard>
            ))}
          </Grid>
        </div>
      ))}
      {list.length === 0 &&
        <Typography variant="h2" sx={{ marginLeft: 10 }}>
          No records!
        </Typography>
      }
    </div>
  )
}

export default Tracker