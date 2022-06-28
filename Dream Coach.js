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
function test_team(t){
	let pace_exact = 6;
	let counter_attack_exact = 1;
	let long_short_pass_exact = 8;
	let ball_possesion_exact = 7;
	let long_short_shot_exact = 5;
	let pressing_exact = 8;
	return pace_exact + counter_attack_exact * t 
		 + long_short_pass_exact * (t ** 2) + ball_possesion_exact * (t**3) 
		 + long_short_shot_exact * (t**4) + pressing_exact * (t**5);
}
/*функция с параметрами команды соперника*/

/*функция сравнения параметров введённых пользователем и эталонных*/
function compare(){
	console.log('время '+t);
	if (t == 0){
	    array = [];
	}
	console.log(array);
    if(t == 240){
		clearInterval(id);
	}
	else if(t % 30 != 0){
		 let exact = test_team(t);
	     let num = 	Number(pace) + counter_attack * t 
		 + long_short_pass * (t ** 2) + ball_possesion* (t**3) 
		 + long_short_shot * (t**4) + pressing* (t**5);
		 
		 let error = Math.abs(exact - num) / exact;
	     array.push(error);
		 
		 error = 0;
	}
	else if(t % 30 == 0 && t != 0 ){
	    let av = average(array);
		array = [];
		if (av>level){
			console.log("Пропускаем");
		}
		else if(av == level){
		    console.log("Ничего не произошло");
		}
		else{
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

