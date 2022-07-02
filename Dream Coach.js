var ball_possesion = 5;//параметр владения мячом 0-10
var counter_attack = 0; // параметр наличия контратак 0-1
var pace = 5; // темп 0-10
var long_short_pass = 5; // соотношение числа длинных и коротких пассов
var long_short_shot = 5; // соотношение числа дальних и ближних ударов
var pressing = 5; // прессинг
var t = 0; // параметр времени матча
var array = []; // массив, куда записывается значения отклонений нашего зн-я и точного
var id; // таймер
var level = 0.1; //уровень сложности
var our_score = 0; // забитые мячи нашей команды
var opponent_score = 0; // забитые мячи команды соперника

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

/*Возможные команды соперника*/
var Liverpool = {
    'Salah': 7.54 ,
	'Mane': 7.29,
	'Firmino': 6.85,
	'Henderson': 6.86,
	'Tiago':7.10,
	'Fabinho': 7.0,
	'Robertson': 7.23,
	'Van Djk': 7.18,
	'Matip':7.35,
	'Trent-Aleksandr-Arnold': 7.51,
	'Alisson': 6.87,
	'counter_attack_exact' : 1, 'long_short_shot_exact' : 3 , 'pace_exact' : 8, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 4, 'pressing_exact' : 7

};
/*Возможные команды соперника*/

/*Наша команда*/
var Based = {
    'Felino': 5.4,
	'Boba': 5.8,
	'MM': 6.85,
	'Van Ge Gol': 5.7,
	'Goslin':5.2,
	'Lind': 5.1,
	'Ger': 6.2,
	'Lover': 5.3,
	'Mitchell': 5.5,
	'Pope': 6.54,
	'Forster': 5.0,
	'counter_attack_exact' : 1, 'long_short_shot_exact' : 5 , 'pace_exact' : 5, 'long_short_pass_exact' : 5, 'ball_possesion_exact' : 5, 'pressing_exact' : 5

};
/*Наша команда*/

/*функция расчёта рейтинга команды*/
function calc_rate(name){
	  var dict = eval(name);
	  rate_arr = [];
	  for(var key in dict) {
         if (key == 'counter_attack_exact' || key == 'long_short_shot_exact' || key == 'pace_exact' 
         || key == 'long_short_pass_exact' || key == 'ball_possesion_exact' || key == 'pressing_exact'){
			  continue;
		  }
      rate_arr.push(dict[key]);
} 	
 return average(rate_arr);
}
/*функция расчёта рейтинга команды*/


var our_rating = calc_rate(Based); //рейтинг нашей команды 0-10
var opponent_rating;//рейтинг команды соперника 0-10
var exact_arr;

/*функция с параметрами команды соперника*/
function test_team(counter_attack_exact, long_short_shot_exact, pace_exact, long_short_pass_exact, ball_possesion_exact, pressing_exact){
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
		our_score = 0;
		opponent_score = 0;
		clearInterval(id);
	}
	else if(t % 30 != 0){
		 //let exact_arr = test_team();
	     let num_arr = 	[Number(counter_attack), Number(long_short_shot), Number(pace),Number(long_short_pass),Number(ball_possesion),Number(pressing)];
		 let error = [(0.7 - level- ((our_rating - opponent_rating)/50)),(0.6 - level- ((our_rating - opponent_rating)/50)),(0.5 - level - ((our_rating - opponent_rating)/50)),
		 (0.4 - level - ((our_rating - opponent_rating)/50)),(0.3 - level - ((our_rating - opponent_rating)/50)),(0.3 - level - ((our_rating - opponent_rating)/50))];
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
			opponent_score = opponent_score + 1;
			document.getElementById("scored").innerHTML ='Наша команда ' + our_score + ':' + opponent_score + ' Команда противника';
		}
		else if(rand == 2){
		    console.log("Ничего не произошло");
		}
		else if (rand == 3){
		    console.log("Забиваем");
			our_score = our_score + 1;
			document.getElementById("scored").innerHTML = 'Наша команда ' + our_score + ':' + opponent_score + ' Команда противника';
		}
	}
    t++;
}
/*функция сравнения параметров введённых пользователем и эталонных*/
var numb = 0; // костыль, чтоб нельзя было менять оппонента по ходу матча
/*функция запуска матча*/
function start(){
    numb++;
	if (numb == 1){ // если 1, то оппонент выбирается впервые
	var opponent_team = document.getElementById("Opponent_team");
    var opponent = opponent_team.value;
	
	opponent_rating = calc_rate(opponent);
	console.log(eval(opponent)['counter_attack_exact']);
	
	exact_arr = test_team(eval(opponent)['counter_attack_exact'], eval(opponent)['long_short_shot_exact'],eval(opponent)['pace_exact'],
	eval(opponent)['long_short_pass_exact'], eval(opponent)['ball_possesion_exact'], eval(opponent)['pressing_exact']);
	id = setInterval(compare, 1000);
	}
else { //иначе оппонент уже выбран
	id = setInterval(compare, 1000);
}
	
}
/*функция запуска матча*/

/*функция завершения матча*/
function stop(){
	numb = 0; // сброс оппонента
	clearInterval(id);
	console.log('Техническое поражение');
	t=0;
	array = [];
}
/*функция завершения матча*/

/*функция остановки матча*/
function on_pause(){
	clearInterval(id);
}
/*функция остановки матча*/

