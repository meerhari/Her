(function() {
  var questions = [
    {
      q: "When offered food he does not like, what does he do?",
      opts: ["Complains loudly", "Eats it without much fuss", "Refuses and asks for something else", "Pretends to eat it"],
      ans: 1,
      right: "Yes -- he will eat whatever you put in front of him. Not picky at all.",
      wrong: "He actually just eats it. Food does not bother him much."
    },
    {
      q: "Which habit of his have you definitely noticed by now?",
      opts: [
        "Overthinking everything at 2am",
        "Saying he is gonna be left behind the moment things feel too good",
        "Disappearing mid-conversation",
        "Being overly formal when nervous"
      ],
      ans: 1,
      right: "You know him too well. It is a reflex. He cannot help it.",
      wrong: "It is the leaving fear. He says it more than he should."
    },
    {
      q: "What is his actual dream in life?",
      opts: [
        "A big career and success",
        "Travel the whole world",
        "Disappear into the mountains and live quietly -- just peace and silence",
        "Find love and settle down"
      ],
      ans: 2,
      right: "Yes. Mountains, silence, peace. That is the whole dream.",
      wrong: "His dream is much quieter. Mountains, silence, a peaceful life away from everything."
    },
    {
      q: "What is his deepest fear?",
      opts: [
        "Being alone forever",
        "Never being enough -- never being the first choice no matter how hard he tries",
        "Losing people he loves suddenly",
        "Failing at everything he attempts"
      ],
      ans: 1,
      right: "You really do know him. That fear lives very close to the surface.",
      wrong: "It is the fear of never being enough."
    },
    {
      q: "What kind of songs does he listen to most?",
      opts: [
        "Loud energetic songs",
        "Whatever is trending",
        "Your favorites, or songs that remind him of you",
        "Old classic songs only"
      ],
      ans: 2,
      right: "Your favorites became his. That is just how it is.",
      wrong: "He listens to your favorites."
    },
    {
      q: "What happens when you try to introduce him to Hifza?",
      opts: [
        "He gets excited and agrees immediately",
        "He pretends he did not hear",
        "He acts unbothered but secretly panics",
        "He says you will leave him for her and spirals a little"
      ],
      ans: 3,
      right: "See? You know exactly what happens.",
      wrong: "He spirals. Every time."
    },
    {
      q: "If he could send you one thing right now, what would it be?",
      opts: [
        "A long voice note",
        "This quiz, just to say he is thinking of you",
        "Silence, because he does not know how to say it",
        "All of the above, honestly"
      ],
      ans: 3,
      right: "All of it. All of it at once.",
      wrong: "All of the above."
    }
  ];

  var current = 0;
  var score = 0;
  var answered = false;

  function showScreen(id) {
    var all = document.querySelectorAll('.screen');
    all.forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    var el = document.getElementById(id);
    el.style.display = 'flex';
    el.classList.add('active');
    window.scrollTo(0, 0);
  }

  function renderQuestion() {
    answered = false;
    var q = questions[current];

    document.getElementById('qNum').textContent = current + 1;
    document.getElementById('qLabel').textContent = 'Q' + (current + 1);
    document.getElementById('qText').textContent = q.q;
    document.getElementById('feedback').textContent = '';
    document.getElementById('progFill').style.width =
      Math.round((current / questions.length) * 100) + '%';

    var container = document.getElementById('qOptions');
    container.innerHTML = '';

    q.opts.forEach((opt, i) => {
      var btn = document.createElement('button');
      btn.className = 'opt';
      btn.textContent = opt;
      btn.dataset.idx = i;
      btn.addEventListener('click', handleAnswer);
      container.appendChild(btn);
    });
  }

  function handleAnswer() {
    if (answered) return;
    answered = true;

    var idx = parseInt(this.dataset.idx, 10);
    var q = questions[current];
    var btns = document.querySelectorAll('.opt');

    btns.forEach(btn => btn.disabled = true);

    if (idx === q.ans) {
      btns[idx].classList.add('correct');
      score++;
      document.getElementById('feedback').textContent = q.right;
    } else {
      btns[idx].classList.add('wrong');
      btns[q.ans].classList.add('correct');
      document.getElementById('feedback').textContent = q.wrong;
    }

    setTimeout(() => {
      current++;
      current < questions.length ? renderQuestion() : showResult();
    }, 2200);
  }

  function showResult() {
    document.getElementById('progFill').style.width = '100%';
    document.getElementById('resultScore').textContent =
      score + ' / ' + questions.length + ' correct';
    showScreen('s-result');
  }

  document.getElementById('startBtn').onclick = () => {
    current = 0; score = 0;
    renderQuestion();
    showScreen('s-quiz');
  };

  document.getElementById('restartBtn').onclick = () => {
    current = 0; score = 0;
    renderQuestion();
    showScreen('s-quiz');
  };

})();