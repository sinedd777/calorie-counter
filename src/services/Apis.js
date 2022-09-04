export const addFood = async  (foodName, calories, date) => {
  const response = await fetch('http://localhost:5000/foods/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:"user2",
            name: foodName,
            calories: calories,
            date: date
        })
      });
      return response.json();
}

export const getAllItems = async  () => {
  const response = await fetch('http://localhost:5000/foods?username=user2', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  });
  return response.json();
}
