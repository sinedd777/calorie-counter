import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';



const ItemCard = ({ name, calories, date, calorieExcess }) => {
  return (
    <Card sx={{
      border: calorieExcess ? "thick double #32a1ce" : 'thick double white', minWidth: 275, maxWidth: 275, margin: 1, boxShadow: 3, "&:hover": {
        boxShadow: 8,
      },
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="color: calorieExcess ? 'white': 'text.secondary'" gutterBottom>
          Food Item: 
        </Typography>
        <Typography variant="h5" component="div" style={{ textTransform: 'capitalize' }} >
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="color: calorieExcess ? 'white': 'text.secondary'">
          Consumed on: {moment(date).format('DD-MM-YYYY')}
        </Typography>
        <Typography variant="body2">
          {calories} Calories
        </Typography>
      </CardContent>

    </Card>
  )
}

export default ItemCard