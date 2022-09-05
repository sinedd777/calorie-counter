export const addFood = async  (foodName, calories, date) => {
  const response = await fetch('http://localhost:5000/foods/add', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name: foodName,
            calories: calories,
            date: date
        })
      });
      return response.json();
}

export const getAllItems = async  () => {
  const response = await fetch('http://localhost:5000/foods', {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
  });
  return response.json();
}

export const getCalorieLimit = async  () => {
  const response = await fetch('http://localhost:5000/users/limit', {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
  });
  return response.json();
}
