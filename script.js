$(document).ready(function () {
    var Aside = document.querySelector("aside");
    var P = document.createElement("p");
    var textG_Over = document.createTextNode("<Game Over!!>");
    var BR = document.createElement("br");
    var Image = document.getElementById("image");
    var textPoints = document.createTextNode("Points: ");
    var Main = document.getElementById("main");
    var H1 = document.querySelector("h1");
    var fPoints = document.createElement("card");
    var Footer = document.querySelector("footer")
    var BTN = document.querySelector("#button");
    var Title = document.querySelector("#title");
    var answerInput = document.querySelector("#answer-text");
    var quizForm = document.querySelector("#quiz-form");
    var question = document.querySelector("#question");
    var GIF = document.querySelector("#gif");
    var answer = "Kobe";
    var btn = document.querySelector(".button");
    var IMG = document.querySelector("img");
    var ans;
    var game = true;
    //var time=true;
    var answeredCorrect = 0;
    //Gametime(seconds)
    var timeleft = 60;
    var Score = 0;
    var i = 1;
    var quest = [
        "1.) Who scored 60-plus points in a game six times?",
        "2.) Lakers’ career leader in games, minutes, points, field goals made and attempted, 3-pointers made and attempted, free throws made and attempted, and win shares?",
        "3.) Who is the only NBA player to have two jerseys retired by the same team?",
        "4.) Who has 12-time All-Defensive team selections?",
        "5.) Who is a 5 time NBA Champion?"
    ];
    // var Kobe_dunk=["./images/0.gif","./images/1.gif","./images/2.gif","./images/3.gif","./images/4.gif","./images/5.gif","./images/6.gif","./images/7.gif",".images/8.gif","./images/9.gif","./images/10.gif",
    //                 "./images/11.gif","./images/12.gif","./images/13.gif","./images/14.gif","./images/15.gif","./images/16.gif","./images/17.gif","./images/18.gif","./images/19.gif","./images/20.gif",
    //                 "./images/21.gif","./images/22.gif","./images/23.gif","./images/24.gif","./images/25.gif","./images/26.gif","./images/27.gif","./images/28.gif","./images/29.gif","./images/30.gif",
    //                 "./images/31.gif","./images/32.gif","./images/33.gif","./images/34.gif","./images/35.gif","./images/36.gif","./images/37.gif","./images/38.gif","./images/39.gif","./images/40.gif",
    //                 "./images/41.gif","./images/42.gif","./images/43.gif","./images/44.gif","./images/45.gif","./images/46.gif","./images/47.gif","./images/48.gif","./images/49.gif","./images/50.gif",
    //                 "./images/51.gif","./images/52.gif","./images/53.gif","./images/54.gif","./images/55.gif"
    //             ];
    answerInput.value = "";
    //Game start click       
    btn.addEventListener("click", function () {
        question.innerHTML = quest[0];
        timer();
        //when answer is submitted(clicked)
        quizForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var answerText = answerInput.value;
            // Return from function early if submitted text is blank
            if (answerText === "") {
                return;
            }
            // Add new value to var ans. clear the input
            ans = answerText;
            answerText = "";
            //Correct answer when final question
            if (ans === answer && i === quest.length) {
                answeredCorrect++;
                i++;
                Score = (answeredCorrect * 20) + (timeleft);
                game = false;
                gameover();
                Win();
                return (Score);
            }
            //Wrong answer when final question
            else if (ans !== answer && i === quest.length) {
                timeleft = timeleft - 5;
                i++;
                Score = (answeredCorrect * 20) + (timeleft);
                game = false;
                gameover();
                Win();
                return (Score);
            }
            //Correct answer when NOT final question
            else if (ans === answer && i < quest.length) {
                answeredCorrect++;
                question.innerHTML = quest[i++];
                answerInput.value = "";
                //tried to have gif array play in sections with every correct answer[DOESNT WORK]
            }
            //Wrong answer when NOT final question
            else if (ans !== answer && i < quest.length) {
                question.innerHTML = quest[i++];
                answerInput.value = "";
                timeleft = timeleft - 5;
            }
            //Closing bracket for enter on input answer      
        });
        //Closing bracket for start of game
    });
    //function that clears section of website, with embedded function DisplaySavedGames()
    function gameover() {
        Aside.innerHTML = "";
        quizForm.innerHTML = "";
        BTN.innerHTML = "";
        Title.innerHTML = "";
        question.innerHTML = "";
        //inside main (last element before footer),,,, create parent section for g_over 
        P.appendChild(textG_Over);
        Main.appendChild(P);
        P.setAttribute("id", "G_Over");
        //inside h1
        var Hed = document.querySelector("h1");
        Hed.setAttribute("style", "text-shadow: 2px 2px red");
        //inside footer element
        fPoints.innerHTML = "Score= " + Score + " points , Correct Answers= " + answeredCorrect;
        Footer.appendChild(fPoints);
        fPoints.setAttribute("id", "fPoints");
        DisplaySavedGames();
    }
    //Prize and condolence for losing function with embedded Saving function
    function Win() {
        var BR = document.createElement("br");
        var P = document.createElement("p");
        var Main = document.querySelector("main");
        //Winning   
        if (Score >= 100) {
            IMG.setAttribute("style", "visibility:visible; border:8px solid gold");
            IMG.setAttribute("src", "./images/KobeDunksOnYao.gif");
            Image.append(BR);
            P.innerHTML = "&#169;" + "NBA";
            P.setAttribute("style", "color:gold");
            BR.parentNode.insertBefore(P, BR.nextSibling);
        }//Losing
        else {
            P.setAttribute("id", "lose");
            P.setAttribute("text-align", "center");
            var section = document.createElement("section");
            section.setAttribute("id", "tryAgain");
            Footer.append(section);
            P.innerHTML = "TRY AGAIN,....IT'S REALLY NOT THAT HARD.";
            section.append(P);
            Main.append(BR);
        }
        SaveCurrentGame();
    }
    //function for saving current score and itials(or name) to local storage,executed second but placed first
    function SaveCurrentGame() {
        var input = document.createElement("input");
        quizForm.innerHTML = "<label>Leave Initials or Name:</label>";
        quizForm.append(input);
        input.setAttribute("id", "saveName");
        var saveName = document.querySelector("#saveName");
        quizForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var a = localStorage.length + 1
            localStorage.setItem("user" + a, $("input").val() + " : Score= " + Score + " Points");
            var par = document.createElement("p");
            par.setAttribute("id", "pSave");
            //#save created in function DisplaySavedGames()
            $("#save").prepend(par);
            var b = localStorage.length
            $("#pSave").append(localStorage["user" + b] + " <br>");
            var score1header = document.createElement("h3");
            score1header.innerHTML = "Saved User Score";
            $("#save").prepend(score1header);
            $("#quiz-form").remove();
        });
    }
    //function for displaying previous saved games(from local storage),executed first but placed second
    function DisplaySavedGames() {
        var section = document.createElement("section");
        section.setAttribute("id", "save");
        var score2header = document.createElement("h3");
        score2header.innerHTML = "Previous User Scores";
        var par = document.createElement("p");
        par.setAttribute("id", "pSave2");
        section.append(score2header);
        section.append(par);
        Footer.append(section);
        for (var b = localStorage.length; b > 0; b--) {
            $("#pSave2").append(localStorage["user" + b] + " <br>");
        };
    }
    //timer function
    function timer() {
        var clock = setInterval(function () {
            timeleft--;
            if (timeleft > 0) {
                document.getElementById("time").textContent = "Time: " + timeleft + " Sec";
            }
            //Third condition for end of game
            //condition for timer to end at 0 along with bug fix where wrong answer(s) caused negative clock times 
            if (timeleft <= 0) {
                clearInterval(clock);
                gameover();
                document.getElementById("time").textContent = "Time: 0 Sec";
            }
            if (game != true) {
                clearInterval(clock);
                document.getElementById("time").textContent = "Time: " + timeleft + " Sec";
            }
        }, 1000);
    };
});