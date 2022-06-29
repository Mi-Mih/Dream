var ball_possesion = 5;//параметр владения мячом 0-10
var counter_attack = 0; // параметр наличия контратак 0-1
var pace = 5; // темп 0-10
var long_short_pass = 5; // соотношение числа длинных и коротких пассов
var long_short_shot = 5; // соотношение числа дальних и ближних ударов
var pressing = 5; // прессинг
var t = 0; // параметр времени матча
var array = []; // массив, куда записывается значения отклонений нашего зн-я и точного
var id; // таймер
var level = 0.7; //уровень сложности
/* считывание значения параметров с ползунков */
document.getElementById('difficulty level').oninput = function(){
	 level= this.value;
}

document.getElementById('ball_possesion').oninput = function(){
	ball_possesion = this.value;
}

document.getElementById('counter_attack').oninput = function(){
	 counter_attack= this.value;
}

document.getElementById('pace').oninput = function(){
	 pace = this.value;
}

document.getElementById('long_short_pass').oninput = function(){
	long_short_pass = this.value;
}

document.getElementById('long_short_shot').oninput = function(){
	long_short_shot = this.value;
}

document.getElementById('pressing').oninput = function(){
	pressing = this.value;
}

/*функция рандом*/
function getRandomArrayElement(arr){
   return arr[Math.floor(Math.random()*arr.length)]
}
/*функция рандом*/

/*функция расчёта среднего значения*/
function  average(arr)
{
    if(arr.length === 0)
        return 0;
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    } 
    return sum / arr.length;
}
/*функция расчёта среднего значения*/

/*функция с параметрами команды соперника*/
function test_team(){
	let pace_exact = 6;
	let counter_attack_exact = 1;
	let long_short_pass_exact = 8;
	let ball_possesion_exact = 7;
	let long_short_shot_exact = 5;
	let pressing_exact = 8;
	return [counter_attack_exact, long_short_shot_exact, pace_exact, long_short_pass_exact, ball_possesion_exact, pressing_exact];
}
/*функция с параметрами команды соперника*/

/*функция сравнения параметров введённых пользователем и эталонных*/
function compare(){
	console.log('время '+t);
	if (t == 0){
	    array = [];
	}
	console.log(array);
    if(t == 241){
		clearInterval(id);
	}
	else if(t % 30 != 0){
		 let exact_arr = test_team();
	     let num_arr = 	[Number(counter_attack), Number(long_short_shot), Number(pace),Number(long_short_pass),Number(ball_possesion),Number(pressing)];
		 let error = [(0.7 - level),(0.6 - level),(0.5 - level),(0.4 - level),(0.3 - level),(0.3 - level)]
		 for (var i = 0; i < error.length; i++) {
              if ((Math.abs(exact_arr[i] - num_arr[i]) / exact_arr[i]) < error[i] ){
				  array.push(3)
			  }
			  else if ((Math.abs(exact_arr[i] - num_arr[i]) / exact_arr[i]) <= (error[i] + 0.3) && (Math.abs(exact_arr[i] - num_arr[i]) / exact_arr[i]) >= (error[i] - 0.3) ){array.push(2);}
			  else{array.push(1);}
         }		 
	}
	else if(t % 30 == 0 && t != 0 ){
		let rand = getRandomArrayElement(array);
		array = [];
		if (rand == 1 ){
			console.log("Пропускаем");
		}
		else if(rand == 2){
		    console.log("Ничего не произошло");
		}
		else if (rand == 3){
		    console.log("Забиваем");
			
		}
	}
    t++;
}
/*функция сравнения параметров введённых пользователем и эталонных*/

/*функция запуска матча*/
function start(){
	id = setInterval(compare, 1000); 
}
/*функция запуска матча*/

/*функция завершения матча*/
function stop(){
	clearInterval(id);
	t=0;
	array = [];
}
/*функция завершения матча*/

/*функция остановки матча*/
function on_pause(){
	clearInterval(id);
}
/*функция остановки матча*/

