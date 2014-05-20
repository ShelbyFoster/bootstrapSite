var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope, $http) {
    quest = [];
    options = [];
    $http.get('JSON/questions.json').success(function(data) {
        for(i = 0; i < data.questions.length; i++){
            o = [];
            //var q = data.questions[i].question;
            //var o1 = data.questions[i].option1;
            //var o2 = data.questions[i].option2;
            // var o3 = data.questions[i].option3;
            quest.push(data.questions[i].question);
            o.push(data.questions[i].option1,data.questions[i].option2,data.questions[i].option3);
            options.push(o);
        }
        console.log(quest);
        console.log(options);
    });

    var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        var quizbg = new Image();
        var Question = new String;
        var Option1 = new String;
        var Option2 = new String;
        var Option3 = new String;
        var my=0;
        var CorrectAnswer = 0;
        var qnumber = 0;
        var rightanswers=0;
        var wronganswers=0;
        var QuizFinished = false;
        var lock = false;
        var textpos1=45;
        var textpos2=145;
        var textpos3=230;
        var textpos4=325;

        quizbg.onload = function(){
        context.drawImage(quizbg,0,0);
            SetQuestions();
        }
        quizbg.src = "quizbg.png";


    SetQuestions = function(){

        Question=  quest[qnumber];
        CorrectAnswer=1+Math.floor(Math.random()*3);

      if(CorrectAnswer==1){Option1=options[qnumber][0];Option2=options[qnumber][1];Option3=options[qnumber][2];}
        if(CorrectAnswer==2){Option1=options[qnumber][2];Option2=options[qnumber][0];Option3=options[qnumber][1];}
        if(CorrectAnswer==3){Option1=options[qnumber][1];Option2=options[qnumber][2];Option3=options[qnumber][0];}

        context.textBaseline = "middle";
        context.font = "24pt Calibri,Arial";
        context.fillText(Question,20,textpos1);
        context.font = "18pt Calibri,Arial";
        context.fillText(Option1,20,textpos2);
        context.fillText(Option2,20,textpos3);
        context.fillText(Option3,20,textpos4);
    }//SetQuestions

    canvas.addEventListener('click',ProcessClick,false);

    function ProcessClick(ev) {
        my=ev.y-canvas.offsetTop;
        if(ev.y == undefined){
            my = ev.pageY - canvas.offsetTop;
        }
        if(lock){
            ResetQ();
        }//if lock
        else{
            if(my>110 && my<180){GetFeedback(1);}
            if(my>200 && my<270){GetFeedback(2);}
            if(my>290 && my<360){GetFeedback(3);}
        }//!lock
    }//ProcessClick

    ResetQ= function(){
        lock=false;
        context.clearRect(0,0,550,400);
        qnumber++;
        if(qnumber==quest.length){EndQuiz();}
        else{
            context.drawImage(quizbg, 0, 0);
            SetQuestions();}
    }

    EndQuiz=function(){
        canvas.removeEventListener('click',ProcessClick,false);
        context.drawImage(quizbg, 0,0,550,90,0,0,550,400);
        context.font = "20pt Calibri,Arial";
        context.fillText("You have finished the quiz!",20,100);
        context.font = "16pt Calibri,Arial";
        context.fillText("Correct answers: "+String(rightanswers),20,200);
        context.fillText("Wrong answers: "+String(wronganswers),20,240);
    }

    GetFeedback = function(a){

        if(a==CorrectAnswer){
            context.drawImage(quizbg, 0,400,75,70,480,110+(90*(a-1)),75,70);
            rightanswers++;
        }
        else{
            context.drawImage(quizbg, 75,400,75,70,480,110+(90*(a-1)),75,70);
            wronganswers++;
        }
        context.font = "14pt Calibri,Arial";
        context.fillText("Click again to continue",20,380);
        lock=true;
    }//get feedback
});