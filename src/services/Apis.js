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

export const deleteFoodItem = async  (id) => {
  const response = await fetch('http://localhost:5000/foods/delete', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          id: id,
      })
  });
  return response.json();
}

export const updateFoodItem = async  (id, name, calories, date) => {
  const response = await fetch('http://localhost:5000/foods/update', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          id: id,
          name: name,
          calories: calories,
          date: date
      })
  });
  return response.json();
}


export const getAllFoodItemsAdmin = async  () => {
  const response = await fetch('http://localhost:5000/foods/all', {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
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

export const getAllUsers = async () => {
  const response = await fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
  });
  return response.json();
}

export const removeUser = async (username) => {
  const response = await fetch('http://localhost:5000/users/delete', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: username,
      })
  });
  return response.json();
}

export const updateUser = async (username,calorieLimit) => {
  const response = await fetch('http://localhost:5000/users/update', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: username,
          calorieLimit: calorieLimit
      })
  });
  return response.json();
}

