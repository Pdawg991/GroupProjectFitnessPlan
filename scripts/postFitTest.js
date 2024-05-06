document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('fitnessTestForm');
  
  // Listens for when the submit button is clicked.
  form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent default form submission
      
      // Gets the values contained in the form wrapper.
      const payload = new FormData(form);

      let selectedFitnessLevel = 0;
      
      // Get all elements with a name equal to radio.
      const fitnessLevelRadios = document.querySelectorAll('input[name^="fitnessLevel"]');
      
      // Anonymous function to loop through all radio buttons. Find which is checked.
      fitnessLevelRadios.forEach(radio => {
          if (radio.checked) {
              // If radio is checked, remove the level text, and then parse the 
              // remaining string representation of the integer into an integer.
              selectedFitnessLevel = parseInt(radio.id.replace('level', ''));
          }
      });
      const response2 = await fetch('/bio/getClient', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include',
    });
        const clientInfo = await response2.json();






      // Get access token and send fitness test data
        const current_weight = payload.get('curWeight');
        const goal_weight = payload.get('goalWeight');
        const clientAge = clientInfo.clientAge;
        const gender = payload.get('gender');
        const height = parseInt(payload.get('heightFt')) + parseInt(payload.get('heightIn'));
        const fitness_level =  selectedFitnessLevel;
        const clientName = clientInfo.clientName;


        const workouts = new Workout(clientAge, current_weight, gender, height, clientName, goal_weight, fitness_level); // tests everything
        const diet = new Diet(clientAge, current_weight, gender, height, clientName, goal_weight, fitness_level); // tests everything
        const data = {
            current_weight,
            goal_weight,
            gender,
            height,
            fitness_level,
            clientAge,
            clientName,
            exercises: workouts.Exercises(),
            diet: diet.Macronutrients(),
            caloricIntake: parseInt(workouts.CalIntake())
        }
    await sendRefreshToken();
    await sendFitTest(data);
  });
});

const sendFitTest = async (data) => {
  try {
//LOOK FOR DOC
const newestPlan = { sortBy: "createdAt", sortOrder: -1 };
const checkForPlan = await fetch('/bio/find', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    credentials: 'include',
    body: JSON.stringify(newestPlan),
});
    if(checkForPlan.status == 404){
      const response = await fetch('/bio', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          credentials: 'include',
          body: JSON.stringify(data),
      });
      if (!response.ok) {
          if (response.status === 401) {
              throw new Error("Unauthorized");
          }
          throw new Error(`${response.status} ${response.statusText}`);
      }
      window.location.href = 'information.html';
    }
    else{
        //PATCH
        await fetch('/bio/updateBio', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        window.location.href = 'information.html';
    }

  } catch (error) {
      console.error('Error sending fitness test data:', error);
      // Handle the error as needed
  }
};

const sendRefreshToken = async () => {
  try {
      const response = await fetch('/refresh', {
          method: "GET",
          credentials: 'include'
      });
      
      if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const responseBody = await response.json();
      localStorage.setItem('accessToken', responseBody.accessToken);
  } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle the error as needed
      return null;
  }
};


class User { // gathers general information from the user
    constructor(age, weight, gender, height, name, goal_weight, level){
        this.age = age;
        this.weight = weight;
        this.gender = gender;
        this.height = height;
        this.name = name;
        this.goal_weight = goal_weight;
        this.level = level;
    }

    static displayName = this.name;
        BMI (){
        const BM = this.weight/(this.height)^2;
        return BM;
    }
        BMR (){ // calculates basal metabollic rate
        let MR;
        switch(this.gender){
            case 'm':
        MR = 66 + (6.23 * this.weight) + (12.7 * this.height) - (6.8 * this.age);
        break;
            case 'f':
        MR = 665 + (4.3* this.weight) + (4.7 * this.height) - (4.7 * this.age);
        break;
    }
    return MR;
}

}
class Workout extends User { //Generates the recommended calorie intake + workout program for user
    CalIntake(){ //calculates calorie intake from user
        let TDEE;
        let calories;
        if(this.weight>this.goal_weight ){ // goal is to lose weight

             switch(this.level){
                case 1:
                    TDEE = 1.2 * super.BMR();
                    calories = TDEE - 200;
                    break;
                case 2:
                    TDEE = 1.375 * super.BMR();
                    calories = TDEE - 300;
                    break;
                case 3:
                    TDEE = 1.55 * super.BMR();
                    calories = TDEE - 450;
                    break;
                case 4:
                    TDEE = 1.725 * super.BMR();
                    calories = TDEE - 600;
                    break;
                case 5:
                    TDEE = 1.9 * super.BMR();
                    calories = TDEE - 750;
                    break;
            }
            
            
        }
        if(this.weight < this.goal_weight){// goal is to gain muscle (gain weight)
            switch(this.level){
                case 1:
                    TDEE = 1.2 * super.BMR();
                    calories = TDEE + 200;
                    break;
                case 2:
                    TDEE = 1.375 * super.BMR();
                    calories = TDEE + 300;
                    break;
                case 3:
                    TDEE = 1.55 * super.BMR();
                    calories = TDEE + 450;
                    break;
                case 4:
                    TDEE = 1.725 * super.BMR();
                    calories = TDEE + 600;
                    break;
                case 5:
                    TDEE = 1.9 * super.BMR();
                    calories = TDEE + 750;
                    break;
            }
        }
        return calories;
    }


    Exercises(){ //Gives workouts for respective fitness levels
        const workouts = [];
        
        if(this.weight > this.goal_weight){ // Goal is to lose weight, HIIT exercises
            switch(this.level){ 
                case 1:
                workouts.push (
                    ["Jumping Jacks", "Work Time: 30 seconds", "Rest time: 20 seconds" ],
                    ["High Knees", "Work Time: 30 seconds", "Rest time: 20 seconds"],
                    ["Plank", "Work Time: 30 seconds", "Rest time: 20 seconds"],
                    ["Knee Assisted Pushups", "Number of reps: 5 - 10", " Rest time: 20 seconds"],
                    ["Squats", "Number of reps: 5 - 10", "End of Workout"]
                );
                break;
                case 2:
                    workouts.push (
                        ["Jumping Jacks", "Work Time: 45 seconds", "Rest time: 20 seconds"],
                        ["High Knees", "Work Time: 45 seconds", "Rest time: 20 seconds"],
                        ["Plank", "Work Time: 45 seconds", "Rest time: 20 seconds"],
                        ["Pushups", "Number of reps: 10", " Rest time: 20 seconds"],
                        ["Squats", "Number of reps: 10", "End of Workout"]
                    );
                    break;
                case 3:
                    workouts.push (
                        ["Burpees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["High Knees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Russian Twists", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Pushups", "Number of reps: 15 - 20", " Rest time: 15 seconds"],
                        ["Squats", "Number of reps: 15 -20", "End of Workout"]
                    );
                    break;
                case 4:
                    workouts.push (
                        ["Burpees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Jump Rope", "Work Time: 60 seconds", "Rest time: 15 seconds"],
                        ["Russian Twists", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Archer Pushups", "Number of reps: 3 - 7 (each side)", " Rest time: 15 seconds"],
                        ["Jump Squats", "Number of reps: 10 -15", "End of Workout"]
                    );
                    break;
                case 5: 
                workouts.push (
                    ["Burpees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                    ["Jump Rope", "Work Time: 60 seconds", "Rest time: 15 seconds"],
                    ["Mountain Climbers", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                    ["Russian Twists", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                    ["Archer Pushups", "Number of reps: 3 - 7 (each side)", " Rest time: 15 seconds"],
                    ["Diamond Pushups", "Number of reps: 7 - 10", "Rest time: 15 seconds"],
                    ["Jump Squats", "Number of reps: 10 -15", "End of Workout"]
                );
                break;
            }

        }

   
        if(this.weight < this.goal_weight){ //goal is to build muscle, hypertrophy and strength training
            switch(this.level){ 
                case 1:
                workouts.push(
                    ["Knee Assisted Pushups", "Number of reps: 5 - 10", "Rest time: 45 seconds" ],
                    ["Assisted Squats", "Number of reps: 5 - 10", "Rest time: 45 seconds"],
                    ["Sit ups", "Number of reps: 5 - 10", "Rest time: 45 seconds"],
                    ["Body row", "Number of reps: 5 - 10", " Rest time: 45 seconds"],
                    ["Tricep Dips", "Number of reps: 5 - 10", "End of Workout"]
                );
                break;
                case 2:
                    workouts.push(
                        ["Pushups", "Number of reps: 5 - 10", "Rest time: 45 seconds" ],
                        ["Squats", "Number of reps: 5 - 10", "Rest time: 45 seconds"],
                        ["Sit ups", "Number of reps: 10 - 15", "Rest time: 45 seconds"],
                        ["Body row", "Number of reps: 7- 15", " Rest time: 45 seconds"],
                        ["Tricep Dips", "Number of reps: 10", "End of Workout"]
                    );
                    break;
                case 3:
                    workouts.push(
                        ["Pushups", "Number of reps: 15", "Rest time: 45 seconds" ],
                        ["Squats", "Number of reps: 15 - 20", "Rest time: 45 seconds"],
                        ["Sit ups", "Number of reps: 25+", "Rest time: 45 seconds"],
                        ["Pull ups", "Number of reps: 5 - 7", " Rest time: 45 seconds"],
                        ["Tricep Dips", "Number of reps: 15 - 20", "End of Workout"]
                    );
                    break;
                case 4:
                    workouts.push(
                        ["Diamond Pushups", "Number of reps: 15", "Rest time: 45 seconds" ],
                        ["Archer Squats", "Number of reps: 10 (each side)", "Rest time: 45 seconds"],
                        ["Bicycle crunches", "Workout time: 45 seconds", "Rest Time: 20 seconds"],
                        ["Pull ups", "Number of reps: 10 - 15", " Rest time: 45 seconds"],
                        ["Archer Pushups", "Number of reps: 10 (each side)", "End of Workout"]
                    );
                    break;
                case 5: 
                workouts.push(
                        ["Diamond Pushups", "Number of reps: 15", "Rest time: 45 seconds" ],
                        ["Archer Squats", "Number of reps: 10 (each side)", "Rest time: 45 seconds"],
                        ["Bicycle crunches", "Workout time: 45 seconds", "Rest Time: 20 seconds"],
                        ["Clapping Pushups", "Number of reps: 7", "Rest time: 45 seconds"],
                        ["Pull ups", "Number of reps: 10 - 15", " Rest time: 45 seconds"],
                        ["Archer Pushups", "Number of reps: 10 (each side)", "Rest time: 45 seconds"],
                        ["Archer Body Rows", "Number of reps: 7 (each sides)", "End of Workout "]
                );
                break;
            }
        }
        return workouts;
    }
    Display(){
        if(this.weight>this.goal_weight){
        return (`Your goal is to lose weight. To achieve your goal you must eat ${this.CalIntake()} calories daily. Check food labels to confirm the amount of calories in each food item.\n
        Below is your given workout. Do this atleast 3 times a week and get adequate rest. \n ${this.Exercises()}`);
         }
         if(this.weight<this.goal){
            return (`Your goal is to build muscle and strength. To achieve your goal you must eat ${this.CalIntake()} calories daily. Check food labels to confirm the amount of calories in each food item.\n
            Below is your given workout. To maximize results, do this atleast 3 times a week and get adequate rest. \n ${this.Exercises()}`);
         }

}
}
class Diet extends Workout{
    Macronutrients(){ // calculates required protein, carbs, and fats etc

        
        let prot; //protein
        let carb; // carbohydrates
        let fat; // fats
        let fib; //fiber
        let wat; //water
        if(this.weight < this.goal_weight){ //gain weight
            prot = super.CalIntake() * 0.3; //in cals to be converted to grams
            fat = super.CalIntake() * 0.25; 
            carb = super.CalIntake() * 0.45; 

        }
         if(this.weight > this.goal_weight){ //lose weight
            prot = super.CalIntake()* 0.3;
            fat = super.CalIntake()* 0.2;
            carb = super.CalIntake()*0.5;
        }  

        wat = this.weight/2; // in ounces
        fib = super.CalIntake()/1000 * 14; //already in grams
        
        //converts from cals to grams
        prot = prot / 4;
        fat = fat / 9;
        carb = carb / 4;
    const Nutrients = [];
    Nutrients.push(
        `${parseInt(prot)} grams`,
        `${parseInt(fat)} grams`,
        `${parseInt(carb)} grams`, 
        `${parseInt(wat)} ounces`, 
        `${parseInt(fib)} grams`);

    return Nutrients;
}
}