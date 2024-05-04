

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
                    ["Exercise: Jumping Jacks", "Work Time: 30 seconds", "Rest time: 20 seconds" ],
                    ["Exercise: High Knees", "Work Time: 30 seconds", "Rest time: 20 seconds"],
                    ["Exercise: Plank", "Work Time: 30 seconds", "Rest time: 20 seconds"],
                    ["Exercise: Knee Assisted Pushups", "Number of reps: 5 - 10", " Rest time: 20 seconds"],
                    ["Exercise: Squats", "Number of reps: 5 - 10", "End of Workout"],
                    ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                );
                break;
                case 2:
                    workouts.push (
                        ["Exercise: Jumping Jacks", "Work Time: 45 seconds", "Rest time: 20 seconds"],
                        ["Exercise: High Knees", "Work Time: 45 seconds", "Rest time: 20 seconds"],
                        ["Exercise: Plank", "Work Time: 45 seconds", "Rest time: 20 seconds"],
                        ["Exercise: Pushups", "Number of reps: 10", " Rest time: 20 seconds"],
                        ["Exercise: Squats", "Number of reps: 10", "End of Workout"],
                        ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                    );
                    break;
                case 3:
                    workouts.push (
                        ["Exercise: Burpees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Exercise: High Knees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Exercise: Russian Twists", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Exercise: Pushups", "Number of reps: 15 - 20", " Rest time: 15 seconds"],
                        ["Exercise: Squats", "Number of reps: 15 -20", "End of Workout"],
                        ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                    );
                    break;
                case 4:
                    workouts.push (
                        ["Exercise: Burpees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Exercise: Jump Rope", "Work Time: 60 seconds", "Rest time: 15 seconds"],
                        ["Exercise: Russian Twists", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                        ["Exercise: Archer Pushups", "Number of reps: 3 - 7 (each side)", " Rest time: 15 seconds"],
                        ["Exercise: Jump Squats", "Number of reps: 10 -15", "End of Workout"],
                        ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                    );
                    break;
                case 5: 
                workouts.push (
                    ["Exercise: Burpees", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                    ["Exercise: Jump Rope", "Work Time: 60 seconds", "Rest time: 15 seconds"],
                    ["Exercise: Mountain Climbers", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                    ["Exercise: Russian Twists", "Work Time: 45 seconds", "Rest time: 15 seconds"],
                    ["Exercise: Archer Pushups", "Number of reps: 3 - 7 (each side)", " Rest time: 15 seconds"],
                    ["Exercise: Diamond Pushups", "Number of reps: 7 - 10", "Rest time: 15 seconds"],
                    ["Exercise: Jump Squats", "Number of reps: 10 -15", "End of Workout"],
                    ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                );
                break;
            }

        }

   
        if(this.weight < this.goal_weight){ //goal is to build muscle, hypertrophy and strength training
            switch(this.level){ 
                case 1:
                workouts.push(
                    ["Exercise: Knee Assisted Pushups", "Number of reps: 5 - 10", "Rest time: 45 seconds" ],
                    ["Exercise: Assisted Squats", "Number of reps: 5 - 10", "Rest time: 45 seconds"],
                    ["Exercise: Sit ups", "Number of reps: 5 - 10", "Rest time: 45 seconds"],
                    ["Exercise: Body row", "Number of reps: 5 - 10", " Rest time: 45 seconds"],
                    ["Exercise: Tricep Dips", "Number of reps: 5 - 10", "End of Workout"],
                    ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                );
                break;
                case 2:
                    workouts.push(
                        ["Exercise: Pushups", "Number of reps: 5 - 10", "Rest time: 45 seconds" ],
                        ["Exercise: Squats", "Number of reps: 5 - 10", "Rest time: 45 seconds"],
                        ["Exercise: Sit ups", "Number of reps: 10 - 15", "Rest time: 45 seconds"],
                        ["Exercise: Body row", "Number of reps: 7- 15", " Rest time: 45 seconds"],
                        ["Exercise: Tricep Dips", "Number of reps: 10", "End of Workout"],
                        ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                    );
                    break;
                case 3:
                    workouts.push(
                        ["Exercise: Pushups", "Number of reps: 15", "Rest time: 45 seconds" ],
                        ["Exercise: Squats", "Number of reps: 15 - 20", "Rest time: 45 seconds"],
                        ["Exercise: Sit ups", "Number of reps: 25+", "Rest time: 45 seconds"],
                        ["Exercise: Pull ups", "Number of reps: 5 - 7", " Rest time: 45 seconds"],
                        ["Exercise: Tricep Dips", "Number of reps: 15 - 20", "End of Workout"],
                        ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                    );
                    break;
                case 4:
                    workouts.push(
                        ["Exercise: Diamond Pushups", "Number of reps: 15", "Rest time: 45 seconds" ],
                        ["Exercise: Archer Squats", "Number of reps: 10 (each side)", "Rest time: 45 seconds"],
                        ["Exercise: Bicycle crunches", "Workout time: 45 seconds", "Rest Time: 20 seconds"],
                        ["Exercise: Pull ups", "Number of reps: 10 - 15", " Rest time: 45 seconds"],
                        ["Exercise: Archer Pushups", "Number of reps: 10 (each side)", "End of Workout"],
                        ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
                    );
                    break;
                case 5: 
                workouts.push(
                        ["Exercise: Diamond Pushups", "Number of reps: 15", "Rest time: 45 seconds" ],
                        ["Exercise: Archer Squats", "Number of reps: 10 (each side)", "Rest time: 45 seconds"],
                        ["Exercise: Bicycle crunches", "Workout time: 45 seconds", "Rest Time: 20 seconds"],
                        ["Exercise: Clapping Pushups", "Number of reps: 7", "Rest time: 45 seconds"],
                        ["Exercise: Pull ups", "Number of reps: 10 - 15", " Rest time: 45 seconds"],
                        ["Exercise: Archer Pushups", "Number of reps: 10 (each side)", "Rest time: 45 seconds"],
                        ["Exercise: Archer Body Rows", "Number of reps: 7 (each sides)", "End of Workout "]
                        ["Repeat for 2 more rounds", "Rest for 1 minute (60 seconds) in between each round"]
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
            Below is your given workout. To maximize results, do this atleast 3 times a week and get adequate res. \n ${this.Exercises()}`);
         }

}
}

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
const newData = async() => {
    await sendRefreshToken();
    const data = { sortBy: "createdAt", sortOrder: -1 };
    
    const response = await fetch('/bio/find', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    const response2 = await fetch('/bio/getClient', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include',
    });
        const nameRes = await response2.json();
        
        const userData = new User(nameRes.clientAge, resData.current_weight, 
            resData.gender, resData.height, nameRes.clientName, resData.goal_weight, 5);
            //console.log(userData.BMR());
        const userWorkout = new Workout(resData.clientAge, resData.current_weight, 
            resData.gender, resData.height, nameRes, resData.goal_weight, 5); // tests everything
            const exercises = userWorkout.Exercises();

            var tableBody = document.getElementById("workoutTable");
            tableBody.innerHTML = "<tr><th>Exercise</th><th>Reps/Duration</th><th>Rest Time</th></tr>";
            
            // Populate table with exercise data
            exercises.forEach(exercise => {
              var row = `<tr><td>${exercise[0]}</td><td>${exercise[1]}</td><td>${exercise[2]}</td></tr>`;
              tableBody.innerHTML += row;});
}
newData();


/*const test = new User (29 , 180, 'm', 105, 'Matthew Gittens', 150, 5);
console.log(test.BMR());//testes bmr function


const test2 = new Workout(29, 180, 'm', 105, 'Matthew Gittens', 150, 5); // tests everything
console.log(test2.Display());*/